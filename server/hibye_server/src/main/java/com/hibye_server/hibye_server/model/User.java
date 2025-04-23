package com.hibye_server.hibye_server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor

public class User {
    private String id;
    private String nickname;
    
    private String password;
    private SkinType skintype;
    private String profile_pic;

    private boolean isDeleted;
}

