package com.popplar.gameservice.service;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class WebClientService {
    public <T, C> C retryWithBackoff(
        WebClient webClient,
        HttpMethod httpMethod,
        String uri,
        T body,
        int retries,
        Class<C> classType
    ) {
        try {
            WebClient.RequestBodyUriSpec request = null;
            if (httpMethod == HttpMethod.POST) {
                request = webClient.post();
            } else if (httpMethod == HttpMethod.PATCH) {
                request = webClient.patch();
            } else {
                throw new IllegalArgumentException("Unsupported HTTP method: " + httpMethod);
            }

            return request
                .uri(uri)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(classType)
                .block();
        } catch (WebClientResponseException e) {
            if (retries > 0) {
                return retryWithBackoff(webClient, httpMethod, uri, body, retries - 1, classType);
            } else {
                // 재시도 횟수가 소진되거나 타임아웃이 1초 미만인 경우 예외를 발생시킴
                throw new RuntimeException("webclient timeout", e);
            }
        }
    }
}