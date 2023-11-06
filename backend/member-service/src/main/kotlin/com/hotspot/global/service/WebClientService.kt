package com.hotspot.global.service

import org.springframework.http.HttpMethod
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClientResponseException

open class WebClientService {

    fun <T: Any, C : Any> retryWithBackoff(
            webClient: WebClient,
            httpMethod: HttpMethod,
            uri: String,
            body: T,
            retries: Int,
            classType: Class<C>
    ): Any? {
        try {
            val request = when (httpMethod) {
                HttpMethod.POST -> webClient.post()
                HttpMethod.PATCH -> webClient.patch()
                else -> throw IllegalArgumentException("Unsupported HTTP method: $httpMethod")
            }

            return request
                    .uri(uri)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(classType)
                    .block()
        } catch (e: WebClientResponseException) {
            if (retries > 0) {
                return retryWithBackoff(webClient, httpMethod, uri, body, retries - 1, classType)
            } else {
                // 재시도 횟수가 소진되거나 타임아웃이 1초 미만인 경우 예외를 발생시킴
                throw RuntimeException("webclient timeout", e)
            }
        }
    }
}