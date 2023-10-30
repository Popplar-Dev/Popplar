package com.hotspot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class PopplarApplication {

	public static void main(String[] args) {
		SpringApplication.run(PopplarApplication.class, args);
	}

}
