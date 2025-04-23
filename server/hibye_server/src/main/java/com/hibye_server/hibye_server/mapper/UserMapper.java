package com.hibye_server.hibye_server.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.hibye_server.hibye_server.model.User;

@Mapper
public interface UserMapper {

    // 아이디 중복 체크
    boolean checkIdExist(String id);

    // 회원가입
    void registerUser(User user);

    // User getUserById(String id);

    //로그인
    User loginUser(String id);

    //닉네임 중복 체크
    boolean checkNickExist(String nickname);

    // 회원정보 수정
    void updateUser(User user);
    User findByNickname(String nickname);

    void markUserAsDeleted(String id);


}