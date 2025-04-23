package com.hibye_server.hibye_server.controller;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hibye_server.hibye_server.jwt.JwtUtil;
import com.hibye_server.hibye_server.model.Post;
import com.hibye_server.hibye_server.service.PostService;
import com.hibye_server.hibye_server.service.S3Uploader;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private S3Uploader s3Uploader;
    @Autowired
    private JwtUtil jwtUtil;

    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPost(
            @RequestPart("post") Post post,
            @RequestPart(value = "images", required = false) MultipartFile[] images,
            HttpServletRequest request
    ) {
        // 1. 로그인 체크
        String token = jwtUtil.resolveToken(request);
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        // 2. 작성자 정보 설정
        String userId = jwtUtil.getUserId(token); // ✅ 토큰에서 userId 추출
        post.setUserId(userId);

        // 3. 이미지 저장
        List<String> imagePaths = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    try {
                        String url = s3Uploader.upload(image, "post-images");
                        imagePaths.add(url);
                    } catch (IOException e) {
                        return ResponseEntity.status(500).body("이미지 업로드 실패");
                    }
                }
            }
        }

        // 4. 이미지 경로 저장
        post.setImagePaths(String.join(",", imagePaths));

        // 5. DB 저장
        postService.createPost(post);
        return ResponseEntity.ok("게시글 등록 성공");
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllPosts(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
      int totalCount = postService.getTotalCount();
    int totalPages = (int) Math.ceil((double) totalCount / size);
    List<Post> posts = postService.getAllPosts(page, size);

    List<Map<String, Object>> result = new ArrayList<>();

    for (Post post : posts) {
        int commentCount = postService.getCommentCount(post.getId());

        Map<String, Object> postMap = new HashMap<>();
        postMap.put("id", post.getId());
        postMap.put("title", post.getTitle());
        postMap.put("nickname", post.getNickname());
        postMap.put("category", post.getCategory());
        postMap.put("imagePaths", post.getImagePaths());
        postMap.put("createdAt", post.getCreatedAt());
        postMap.put("commentCount", commentCount);

        result.add(postMap);
    }


    Map<String, Object> response = new HashMap<>();
    response.put("posts", result);
    response.put("totalPages", totalPages);
    response.put("currentPage", page);

    return ResponseEntity.ok(response);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Integer id) {
        Post post = postService.findPostById(id);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 게시글이 존재하지 않습니다.");
        }
        return ResponseEntity.ok(post);
    }

    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPostsByUserPaged(
        @PathVariable String userId,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size) {
    
        int offset = (page - 1) * size;
    
        List<Post> posts = postService.getPostsByUserId(userId,page,size);
        int totalCount = postService.countPostsByUserId(userId);
        int totalPages = (int) Math.ceil((double) totalCount / size);
    
        Map<String, Object> response = new HashMap<>();
        response.put("posts", posts);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalCount", totalCount);
    
        return ResponseEntity.ok(response);
    }
    

    @GetMapping("/category/{category}")
    public ResponseEntity<?> selectPostsByCategoryPaged(
        @PathVariable String category,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        int totalCount = postService.getCountByCategory(category);
        int totalPages = (int) Math.ceil((double) totalCount / size);
        List<Post> posts = postService.selectPostsByCategory(category, page, size);
    
        List<Map<String, Object>> result = new ArrayList<>();
        for (Post post : posts) {
            int commentCount = postService.getCommentCount(post.getId());
    
            Map<String, Object> postMap = new HashMap<>();
            postMap.put("id", post.getId());
            postMap.put("title", post.getTitle());
            postMap.put("nickname", post.getNickname());
            postMap.put("category", post.getCategory());
            postMap.put("imagePaths", post.getImagePaths());
            postMap.put("createdAt", post.getCreatedAt());
            postMap.put("commentCount", commentCount);
    
            result.add(postMap);
        }
    
        Map<String, Object> response = new HashMap<>();
        response.put("posts", result);
        response.put("totalPages", totalPages);
        response.put("currentPage", page);
    
        return ResponseEntity.ok(response);
    }
}
