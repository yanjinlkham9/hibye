package com.hibye_server.hibye_server.model;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Post {
    private Integer id;
    private String title;
    private PostCategory category;
    private String content;
    private String imagePaths;
    private LocalDateTime createdAt;

    private int commentCount;
    private String userId; 
    private String nickname; 
    private String profile_pic;
}
