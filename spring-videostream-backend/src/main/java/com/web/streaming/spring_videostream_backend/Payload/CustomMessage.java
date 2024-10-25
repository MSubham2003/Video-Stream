package com.web.streaming.spring_videostream_backend.Payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomMessage {
    private String message;
    private boolean success = false;
}
