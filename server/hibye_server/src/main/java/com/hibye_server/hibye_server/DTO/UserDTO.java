package com.hibye_server.hibye_server.DTO;

import com.hibye_server.hibye_server.model.SkinType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String id;
    private String nickname;
    private String password; 
    private SkinType skintype;
    private String profile_pic;

}
