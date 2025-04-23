package com.hibye_server.hibye_server.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hibye_server.hibye_server.DTO.UserDTO;
import com.hibye_server.hibye_server.jwt.JwtUtil;
import com.hibye_server.hibye_server.mapper.UserMapper;
import com.hibye_server.hibye_server.model.SkinType;
import com.hibye_server.hibye_server.model.User;
import com.hibye_server.hibye_server.service.S3Uploader;
import com.hibye_server.hibye_server.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;




@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
     @Autowired
    private S3Uploader s3Uploader;

    private final UserMapper userMapper;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    public UserController(AuthenticationManager authManager, JwtUtil jwtUtil, UserMapper userMapper) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
    }
    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            System.out.println("Received user DTO: " + userDTO);
            userService.registerUser(userDTO);
            return ResponseEntity.status(201).body("회원가입이 완료되었습니다!");
    
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("회원가입 중 오류가 발생했습니다.");
        }
    }
    

    @GetMapping("/check/{id}")
    public ResponseEntity<?> checkIdExist(@PathVariable String id) {
        boolean available = !userService.checkIdExist(id);
        return ResponseEntity.ok().body(new IdCheckResponse(available));
    }
    public static class IdCheckResponse {
        private boolean available;

        public IdCheckResponse(boolean available) {
            this.available = available;
        }

        public boolean isAvailable() {
            return available;
        }

        public void setAvailable(boolean available) {
            this.available = available;
        }
    }
    @GetMapping("/checkNick/{nickname}")
    public ResponseEntity<?> checkNickExist(@PathVariable String nickname) {
        boolean available = !userService.checkNickExist(nickname);
        return ResponseEntity.ok().body(new NickCheckResponse(available));
    }   
    public static class NickCheckResponse {
        private boolean available;

        public NickCheckResponse(boolean available) {
            this.available = available;
        }

        public boolean isAvailable() {
            return available;
        }

        public void setAvailable(boolean available) {
            this.available = available;
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO, HttpServletRequest request, HttpServletResponse response ) {
        try {
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getId(), userDTO.getPassword())
            );

            String token = jwtUtil.createToken(userDTO.getId());

            ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(60 * 60 * 2)
                .build();
               

            response.addHeader("Set-Cookie", cookie.toString());
            // 유저 정보 조회 (예: 닉네임 포함)
        String id = userDTO.getId(); 
        User user = userService.getUserById(id);

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("nickname", user.getNickname());
        return ResponseEntity.ok(Map.of(
            "id", user.getId(),
            "nickname", user.getNickname(),
            "skintype", user.getSkintype(),
            "profile_pic", user.getProfile_pic()
        ));
        
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호 오류");
        }
    }

    
  @GetMapping("/check-login")
    public ResponseEntity<?> checkLoginStatus(HttpServletRequest request) {
    String token = jwtUtil.resolveToken(request);

    if (token != null && jwtUtil.validateToken(token)) {
        String userId = jwtUtil.getUserId(token);
        User user = userMapper.loginUser(userId);

        if (user != null) {
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", user.getId());
            userInfo.put("nickname", user.getNickname());
            userInfo.put("skintype", user.getSkintype());
            userInfo.put("profile_pic", user.getProfile_pic());

            return ResponseEntity.ok(userInfo); // ✅ JSON으로 반환
        }
    }

    return ResponseEntity.status(401).body("인증 실패");
}

    

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("accessToken", "")
            .httpOnly(true)
            .path("/")
            .maxAge(0)
            .build();

        response.addHeader("Set-Cookie", deleteCookie.toString());
        return ResponseEntity.ok("로그아웃 성공");
    }

    @PutMapping(value = "/changeInfo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<?> updateUserInfo(
        @RequestPart(required = false) String nickname,
        @RequestPart(required = false) String password,
        @RequestPart(required = false) String skinType,
        @RequestPart(required = false) MultipartFile profileImage,
        HttpServletRequest request
) {
    // ✅ 1. JWT 토큰에서 userId 추출
    String token = jwtUtil.resolveToken(request);
    if (token == null || !jwtUtil.validateToken(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
    }
    String userId = jwtUtil.getUserId(token);

    // ✅ 2. 유저 조회
    User user = userService.getUserById(userId);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 없음");
    }

    // ✅ 3. 변경 정보 반영
    if (nickname != null && !nickname.isBlank()) {
        // 🔥 현재 유저 닉네임과 동일하면 중복 아님!
        if (!nickname.equals(user.getNickname())) {
            if (!userService.isNicknameAvailable(nickname)) {
                return ResponseEntity.badRequest().body("중복된 닉네임");
            }
        }
        user.setNickname(nickname);
    }

    if (password != null && !password.isBlank()) {
        String encrypted = passwordEncoder.encode(password);
        user.setPassword(encrypted);
    }

 if (skinType != null && !skinType.isBlank()) {
    try {
        user.setSkintype(SkinType.valueOf(skinType)); // ✅ 문자열을 enum으로 변환
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body("잘못된 피부 타입입니다.");
    }
}


    if (profileImage != null && !profileImage.isEmpty()) {
        try {
            String imageUrl = s3Uploader.upload(profileImage, "profile");
            user.setProfile_pic(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("이미지 업로드 실패");
        }
    }

    // ✅ 4. 저장
    userService.updateUser(user);

    return ResponseEntity.ok(Map.of(
        "nickname", user.getNickname(),
        "skintype", user.getSkintype(),
        "profile_pic", user.getProfile_pic()
    ));
}
@DeleteMapping("/deleteUser")
public ResponseEntity<?> deleteUser(HttpServletRequest request, HttpServletResponse response) {
    String token = jwtUtil.resolveToken(request);

    if (token == null || !jwtUtil.validateToken(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
    }

    String userId = jwtUtil.getUserId(token);
    userService.deleteUser(userId);

    // 선택: 쿠키 제거 (JWT 무효화 느낌)
    ResponseCookie deleteCookie = ResponseCookie.from("accessToken", "")
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(0)
        .build();
    response.addHeader("Set-Cookie", deleteCookie.toString());

    return ResponseEntity.ok("회원 탈퇴 완료");
}


}
