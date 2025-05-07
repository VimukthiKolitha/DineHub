package com.example.usermanagement.controller;

import com.example.usermanagement.model.News;
import com.example.usermanagement.service.NewsService;
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
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @PostMapping
    public News uploadNews(@RequestBody News news) {
        return newsService.saveNews(news);
    }

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/user/{userId}")
    public List<News> getUserNews(@PathVariable String userId) {
        return newsService.getNewsByUser(userId);
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

            return ResponseEntity.ok("/uploads/" + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("File upload failed.");
        }
    }

    @PutMapping("/{newsId}")
    public ResponseEntity<News> updateNews(@PathVariable String newsId, @RequestBody News updatedNews) {
        News existingNews = newsService.getNewsById(newsId);
        if (existingNews == null) {
            return ResponseEntity.notFound().build();
        }

        existingNews.setTitle(updatedNews.getTitle());
        existingNews.setDescription(updatedNews.getDescription());
        existingNews.setImageUrl(updatedNews.getImageUrl());

        News savedNews = newsService.saveNews(existingNews);
        return ResponseEntity.ok(savedNews);
    }

    @DeleteMapping("/{newsId}")
    public ResponseEntity<?> deleteNews(@PathVariable String newsId) {
        boolean deleted = newsService.deleteNews(newsId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}