package com.hotspot.global.exception.exceptions;

import com.hotspot.global.exception.PopplarApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenException extends PopplarApiException {

    public ForbiddenException(String reason) {
        super(HttpStatus.FORBIDDEN, reason);
    }
}
