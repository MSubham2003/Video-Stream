package com.web.streaming.spring_videostream_backend.Repository;

import com.web.streaming.spring_videostream_backend.Model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepo extends JpaRepository<Video,String> {
    Optional<Video> findByTitle(String title);
}
