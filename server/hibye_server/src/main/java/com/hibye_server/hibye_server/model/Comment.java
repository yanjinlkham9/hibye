package com.hibye_server.hibye_server.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    private Integer commentId;
    private Integer postId;
    private String userId;
    private String nickname;
    private String profile_pic;

    private String content;
    private LocalDateTime createdAt;
}

