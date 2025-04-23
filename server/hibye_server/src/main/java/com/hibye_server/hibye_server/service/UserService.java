package com.hibye_server.hibye_server.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hibye_server.hibye_server.DTO.UserDTO;
import com.hibye_server.hibye_server.mapper.UserMapper;
import com.hibye_server.hibye_server.model.User;



@Service
public class UserService {
    
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // public boolean isLoggedIn(HttpSession session) {
    //         return session.getAttribute("userId") != null; // Checks if userId is in session
    //     }
    public User convertToUser(UserDTO userDTO) {
        // Password is encoded while converting to User
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        
        // Default profile pic handling: If null, a default URL is provided
        String profilePic = (userDTO.getProfile_pic() != null) ? userDTO.getProfile_pic() : "default-profile-pic-url";
        

        return User.builder()
                   .id(userDTO.getId())
                   .nickname(userDTO.getNickname())
                   .password(encodedPassword)  // Encoded password
                   .skintype(userDTO.getSkintype())
                   .isDeleted(false) // Default value for isDeleted
                   .profile_pic(profilePic)
                   .build();
    }
    public void registerUser(UserDTO userDTO){
        User user = convertToUser(userDTO);
        userMapper.registerUser(user);
        

    }
    public boolean checkIdExist(String id) {
        return userMapper.checkIdExist(id);
    }
    public boolean checkNickExist(String nickname) {
        return userMapper.checkNickExist(nickname);
    }

    //회원정보 수정
    public void updateUser(User user) {
        userMapper.updateUser(user); // 또는 직접 DB 호출
    }
    public boolean isNicknameAvailable(String nickname) {
        return userMapper.findByNickname(nickname) == null;
    }
    public User getUserById(String id) {
        return userMapper.loginUser(id);
    }
    public void deleteUser(String userId) {
        userMapper.markUserAsDeleted(userId);

    }
}

