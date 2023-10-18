package com.hotspot.auth.jwt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtDto {

    private Long id;
    private String name;
    private Role role;

    @Builder
    public JwtDto(Long id, String name, Role role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}