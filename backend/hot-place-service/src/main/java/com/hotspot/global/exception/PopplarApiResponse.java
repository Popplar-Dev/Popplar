package com.hotspot.global.exception;

import lombok.Data;

@Data
public class PopplarApiResponse {
    private String timestamp;
    private int status;
    private String error;
    private String path;
    private String reason;

    public PopplarApiResponse(String timestamp, int status, String error, String path,
        String reason) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.path = path;
        this.reason = reason;
    }

}
