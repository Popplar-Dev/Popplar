package com.hotspot.global.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
public class BaseEntity extends BaseTimeEntity {

    @Column(columnDefinition = "Boolean default false")
    private boolean deleted = false;

    public void deleted() {
        this.deleted = true;
    }
}
