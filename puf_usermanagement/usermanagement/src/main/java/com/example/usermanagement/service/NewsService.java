package com.example.usermanagement.service;

import com.example.usermanagement.model.News;
import com.example.usermanagement.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {
    
    @Autowired
    private NewsRepository newsRepository;

    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public List<News> getNewsByUser(String userId) {
        return newsRepository.findByUserId(userId);
    }
    
    public News getNewsById(String newsId) {
        return newsRepository.findById(newsId).orElse(null);
    }
    
    public boolean deleteNews(String newsId) {
        if (newsRepository.existsById(newsId)) {
            newsRepository.deleteById(newsId);
            return true;
        }
        return false;
    }
}