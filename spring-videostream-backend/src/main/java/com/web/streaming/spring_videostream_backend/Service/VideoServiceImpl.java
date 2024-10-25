package com.web.streaming.spring_videostream_backend.Service;

import com.web.streaming.spring_videostream_backend.Model.Video;
import com.web.streaming.spring_videostream_backend.Repository.VideoRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService{
    @Autowired
    private VideoRepo videoRepo;

    @Value("${files.video}")
    String DIR;

    @PostConstruct
    public void init(){
        File file = new File(DIR);
        if(!file.exists()){
            file.mkdir();
            System.out.println("Folder Created !!!!");
        }
        else{
            System.out.println("Folder Already Created");
        }
    }

    @Override
    public Video saveVideo(Video video, MultipartFile file) {
        try{
            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();
            InputStream inputStream = file.getInputStream();

//            Clean the file and folder name ie. remove unwanted character from the filepath
            String cleanFileName = StringUtils.cleanPath(fileName);
            String cleanFolderName = StringUtils.cleanPath(DIR);

//            Get the path
            Path path = Paths.get(cleanFolderName,cleanFileName);
            System.out.println(contentType);
            System.out.println(path);

//            Copy File to the Folder
            Files.copy(inputStream,path, StandardCopyOption.REPLACE_EXISTING);

//            Video MetaData
            video.setContentType(contentType);
            video.setFilePath(path.toString());
//            save Metadata
            return videoRepo.save(video);
        }catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Video> getAllVideos() {
        return videoRepo.findAll();
    }

    @Override
    public Video getById(String id) {
        Video video = videoRepo.findById(id).orElseThrow(()->new RuntimeException("Video not found"));
        return video;
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }
}
