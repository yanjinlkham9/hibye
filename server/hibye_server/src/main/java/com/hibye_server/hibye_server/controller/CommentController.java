package com.hibye_server.hibye_server.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hibye_server.hibye_server.jwt.JwtUtil;
import com.hibye_server.hibye_server.mapper.CommentMapper;
import com.hibye_server.hibye_server.model.Comment;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/posts/comments")
public class CommentController {
    @Autowired
    private CommentMapper commentMapper;
       @Autowired
    private JwtUtil jwtUtil;


    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody Comment comment, HttpServletRequest request) {
        String token = jwtUtil.resolveToken(request);
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        String userId = jwtUtil.getUserId(token); // ✅ 토큰에서 userId 추출
        comment.setUserId(userId);
        commentMapper.insertComment(comment);
        return ResponseEntity.ok("댓글 등록 성공");
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Integer postId) {
        return ResponseEntity.ok(commentMapper.findCommentsByPostId(postId));
    }

}
