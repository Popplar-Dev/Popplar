package com.example.apigateway.filter;

import java.util.List;
import java.util.Objects;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@Component
public class CustomAuthFilter extends AbstractGatewayFilterFactory<CustomAuthFilter.Config> {

    public CustomAuthFilter() {
        super(CustomAuthFilter.Config.class);
    }

    @Override
    public GatewayFilter apply(CustomAuthFilter.Config config) {

        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            System.out.println("filter in");

            if (!request.getHeaders().containsKey("access-token")) {
                System.out.println("no-access");
                return handleUnAuthorized(exchange); // 401 Error
            }

            List<String> token = request.getHeaders().get("access-token");
            String tokenString = Objects.requireNonNull(token).get(0);

            if (!tokenString.equals("A.B.C")) {
                System.out.println("not equal");
                return handleUnAuthorized(exchange); // 토큰이 일치하지 않을 때
            }

            return chain.filter(exchange); // 토큰이 일치할 때
        });
    }

    private Mono<Void> handleUnAuthorized(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();

        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }

    public static class Config {

    }
}
