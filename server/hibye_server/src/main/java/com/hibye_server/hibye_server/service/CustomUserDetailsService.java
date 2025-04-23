package com.hibye_server.hibye_server.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hibye_server.hibye_server.mapper.UserMapper;
import com.hibye_server.hibye_server.model.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserMapper userMapper; 

    public CustomUserDetailsService(UserMapper userMapper) {
        this.userMapper = userMapper;
        
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userMapper.loginUser(id);
        
        if (user == null) {
            throw new UsernameNotFoundException("해당 ID를 가진 유저 없음: " + id);
        }

        return new org.springframework.security.core.userdetails.User(
            user.getId(),
            user.getPassword(),
            List.of(new SimpleGrantedAuthority("USER")) // 권한은 형식상 필요
        );
    }
}
