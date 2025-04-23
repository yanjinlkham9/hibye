package com.hibye_server.hibye_server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hibye_server.hibye_server.mapper.PostMapper;
import com.hibye_server.hibye_server.model.Post;

@Service
public class PostService {
    @Autowired
    private PostMapper postMapper;

    public void createPost(Post post) {
        postMapper.addPost(post);
    }

    public List<Post> getAllPosts(int page, int size) {
        int offset = (page - 1) * size;
        return postMapper.findAllPosts(size, offset);
    }
    
    public Post findPostById(Integer id) {
        return postMapper.findPostById(id);
    }

    public List<Post> getPostsByUserId(String userId, int page, int size) {
        int offset = (page - 1) * size;
        return postMapper.selectPostsByUserId(userId, offset, size); 
    }
    public int countPostsByUserId(String userId) {
        return postMapper.countPostsByUserId(userId);
    }
    
    public List<Post> getPostsByCategory(String skinType) {
        return postMapper.getPostsByCategory(skinType);
    }
    public int getTotalCount() {
        return postMapper.countAllPosts();
    }
    public int getCommentCount(int id) {
        return postMapper.countCommentsByPostId(id);
    }
    public List<Post> selectPostsByCategory(String category, int page, int size) {
        int offset = (page - 1) * size;
        return postMapper.selectPostsByCategory(category, offset, size);
    }
    
    public int getCountByCategory(String category) {
        return postMapper.countPostsByCategory(category);
    }
    
}
