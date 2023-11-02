package com.hotspot.global.exception.handler;

import com.hotspot.global.exception.PopplarApiException;
import com.hotspot.global.exception.PopplarApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PopplarApiException.class)
    public ResponseEntity<PopplarApiResponse> handleNewStocksApiException(PopplarApiException ex) {
        HttpStatus httpStatus = ex.getHttpStatus();
        String reason = ex.getReason();

        LocalDateTime now = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(
            RequestContextHolder.getRequestAttributes())).getRequest();
        String path = request.getRequestURI();

        PopplarApiResponse response = new PopplarApiResponse(formattedDateTime,
            httpStatus.value(), httpStatus.getReasonPhrase(), path, reason);
        return new ResponseEntity<>(response, httpStatus);
    }
}
