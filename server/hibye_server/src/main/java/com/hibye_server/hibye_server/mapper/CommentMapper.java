package com.hibye_server.hibye_server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hibye_server.hibye_server.model.Comment;

@Mapper
public interface CommentMapper {
    void insertComment(Comment comment);
    List<Comment> findCommentsByPostId(Integer postId);
    
}
