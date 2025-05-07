package com.example.usermanagement.service;
import com.example.usermanagement.model.Post;
import com.example.usermanagement.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByUser(String userId) {
        return postRepository.findByUserId(userId);
    }
    public Post getPostById(String postId) {
        return postRepository.findById(postId).orElse(null);
    }
    
    public boolean deletePost(String postId) {
        if (postRepository.existsById(postId)) {
            postRepository.deleteById(postId);
            return true;
        }
        return false;
    }
}
