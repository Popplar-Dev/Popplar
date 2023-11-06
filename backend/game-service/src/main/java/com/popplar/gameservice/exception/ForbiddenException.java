package com.popplar.gameservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenException extends ExceptionHandler {

    public ForbiddenException(String reason) {
        super(HttpStatus.FORBIDDEN, reason);
    }
}
