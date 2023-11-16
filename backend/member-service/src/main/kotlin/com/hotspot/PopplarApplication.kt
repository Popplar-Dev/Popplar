package com.hotspot

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class PopplarApplication

fun main(args: Array<String>) {
	runApplication<PopplarApplication>(*args)
}
