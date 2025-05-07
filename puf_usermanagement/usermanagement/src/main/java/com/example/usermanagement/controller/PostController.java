package com.example.usermanagement.controller;

import com.example.usermanagement.model.Post;
import com.example.usermanagement.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public Post uploadPost(@RequestBody Post post) {
        return postService.savePost(post);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/user/{userId}")
    public List<Post> getUserPosts(@PathVariable String userId) {
        return postService.getPostsByUser(userId);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable String postId, @RequestBody Post updatedPost) {
        Post existingPost = postService.getPostById(postId);
        if (existingPost == null) {
            return ResponseEntity.notFound().build();
        }

        existingPost.setDescription(updatedPost.getDescription());
        existingPost.setImageUrl(updatedPost.getImageUrl());
        existingPost.setVideoUrl(updatedPost.getVideoUrl());

        Post savedPost = postService.savePost(existingPost);
        return ResponseEntity.ok(savedPost);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable String postId) {
        boolean deleted = postService.deletePost(postId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
     try {
        String uploadDir = "uploads/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.write(filePath, file.getBytes());

        return ResponseEntity.ok("/uploads/" + fileName); // This is the URL you return to frontend
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("File upload failed.");
    }
}

}
