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

    @Value("${file.video.hls}")
    String HLS_DIR;

    @PostConstruct
    public void init(){
        File file = new File(DIR);
        if(!file.exists()){
            file.mkdir();
            System.out.println("Folder video Created !!!!");
        }
        else{
            System.out.println("Folder video Already Created");
        }
        File file1 = new File(HLS_DIR);
        if(!file1.exists()){
            file1.mkdir();
            System.out.println("Folder hls Created !!!!");
        }
        else{
            System.out.println("Folder hls Already Created");
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
            Video savedVideo = videoRepo.save(video);

//            video processing
            processVideo(savedVideo.getVideoId());

            return savedVideo;
        }catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error in processing video ");
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

    @Override
    public String processVideo(String videoId) {
        Video video = this.getById(videoId);
        String filePath = video.getFilePath();

        // Path where video is located and where to store processed output
        Path videoPath = Paths.get(filePath);
        Path outputPath = Paths.get(HLS_DIR, videoId);

        try {
            Files.createDirectories(outputPath);  // Ensure output directory exists

            // Construct the ffmpeg command
            String ffmpegCmd = String.format(
                    "ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename \"%s/segment_%%3d.ts\"  \"%s/master.m3u8\"",
                    videoPath.toAbsolutePath(), outputPath.toAbsolutePath(), outputPath.toAbsolutePath()
            );

            // Determine correct shell based on operating system
            ProcessBuilder processBuilder;
            if (System.getProperty("os.name").toLowerCase().contains("win")) {
                processBuilder = new ProcessBuilder("cmd.exe", "/c", ffmpegCmd);
            } else {
                processBuilder = new ProcessBuilder("/bin/bash", "-c", ffmpegCmd);
            }

            processBuilder.inheritIO();  // Log output for debugging
            Process process = processBuilder.start();

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("ffmpeg failed with exit code " + exitCode);
            }

            return videoId;

        } catch (IOException e) {
            e.printStackTrace();  // Print error details for debugging
            throw new RuntimeException("Video Processing failed due to IO issue.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();  // Restore interrupted status
            throw new RuntimeException("Video processing was interrupted.", e);
        }
    }

    public boolean deleteVideo(String videoId) {
        // Retrieve the video by ID
        Video video = videoRepo.findById(videoId).orElse(null);

        if (video != null) {
            // Delete the video file from the filesystem
            Path videoPath = Paths.get(video.getFilePath());
            try {
                Files.deleteIfExists(videoPath);

                // Delete HLS files (if applicable)
                Path hlsDir = Paths.get(HLS_DIR, videoId);
                if (Files.exists(hlsDir)) {
                    Files.walk(hlsDir)
                            .map(Path::toFile)
                            .forEach(file -> {
                                if (!file.delete()) {
                                    System.out.println("Failed to delete: " + file.getAbsolutePath());
                                }
                            });
                }

                // Remove the video record from the database
                videoRepo.delete(video);
                return true;
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }

        return false;
    }


}
