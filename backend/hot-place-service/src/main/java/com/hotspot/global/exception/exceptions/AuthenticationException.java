package com.hotspot.global.exception.exceptions;

import com.hotspot.global.exception.PopplarApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class AuthenticationException extends PopplarApiException {

    public AuthenticationException(String reason) {
        super(HttpStatus.UNAUTHORIZED, reason);
    }
}