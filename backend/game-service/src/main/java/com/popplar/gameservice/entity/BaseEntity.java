package com.popplar.gameservice.entity;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@Getter
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    private Boolean deleted = false;

    @CreatedDate
    private LocalDateTime createdDate;

    public void setDeleted() {
        this.deleted = true;
    }
}
