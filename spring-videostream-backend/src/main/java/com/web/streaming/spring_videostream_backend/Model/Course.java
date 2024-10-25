package com.web.streaming.spring_videostream_backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "video_course")
public class Course {
    @Id
    private String id;
    private String title;

//    @OneToMany(mappedBy = "course")
//    private List<Course> list = new ArrayList<>();
}
