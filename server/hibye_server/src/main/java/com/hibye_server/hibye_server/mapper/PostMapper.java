package com.hibye_server.hibye_server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import com.hibye_server.hibye_server.model.Post;

@Mapper
public interface PostMapper {
    void addPost(Post post);
    // List<Post> findAllPosts();
    Post findPostById(Integer id);
    // List<Post> selectPostsByUserId(String userId);
    List<Post> selectPostsByUserId(@Param("userId") String userId,
    @Param("offset") int offset,
    @Param("size") int size);

    int countPostsByUserId(@Param("userId") String userId);

    List<Post> getPostsByCategory(@Param("category") String category);
    List<Post> findAllPosts(@Param("limit") int limit, @Param("offset") int offset);
    int countAllPosts();

    int countCommentsByPostId(int id);

    List<Post> selectPostsByCategory(@Param("category") String category,
    @Param("offset") int offset,
    @Param("size") int size);

    int countPostsByCategory(@Param("category") String category);

}


