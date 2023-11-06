package com.popplar.gameservice.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = false)
@Data
public class ExceptionHandler extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String reason;

    public ExceptionHandler(HttpStatus httpStatus, String reason) {
        super(reason);
        this.httpStatus = httpStatus;
        this.reason = reason;
    }
}
