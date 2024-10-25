package com.web.streaming.spring_videostream_backend.Service;

import com.web.streaming.spring_videostream_backend.Model.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {
//    Save video
    Video saveVideo(Video video, MultipartFile file);

//    Get All Videos
    List<Video> getAllVideos();

//    Get video by Id
    Video getById(String id);

//    Get video by Title
    Video getByTitle(String title);
}
