package com.hotspot.global.exception.exceptions;

import com.hotspot.global.exception.PopplarApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnAuthorizedException extends PopplarApiException {
    public UnAuthorizedException() {
        super(HttpStatus.UNAUTHORIZED,"계정 권한이 유효하거나 토큰이 존재하지 않습니다.\n다시 로그인을 해주세요.");
    }
}
