package com.popplar.livechat

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class LiveChatApplication

fun main(args: Array<String>) {
	runApplication<LiveChatApplication>(*args)
}
