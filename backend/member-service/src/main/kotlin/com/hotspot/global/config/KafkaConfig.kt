package com.hotspot.global.config

import com.fasterxml.jackson.databind.ObjectMapper
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.producer.ProducerConfig
import org.apache.kafka.common.serialization.StringSerializer
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.*
import java.net.InetAddress
import java.net.UnknownHostException
import java.util.*

@Configuration
class KafkaConfig {

    @Value("\${spring.kafka.bootstrap-servers}")
    lateinit var hosts: String

    @Primary
    @Bean
    fun kafkaListenerContainerFactory(): ConcurrentKafkaListenerContainerFactory<String, Any> {

        val containerFactory = ConcurrentKafkaListenerContainerFactory<String, Any>()
        containerFactory.consumerFactory = consumerFactory()

        return containerFactory
    }

    @Primary
    @Bean
    fun consumerFactory(): ConsumerFactory<String, Any> {

        return DefaultKafkaConsumerFactory(consumerProperties())
    }

    @Bean
    fun consumerProperties(): Map<String, Any> {

        val hostName = try {
            InetAddress.getLocalHost().hostName + UUID.randomUUID().toString()
        } catch (e: UnknownHostException) {
            UUID.randomUUID().toString()
        }

        return hashMapOf(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG to hosts,
                ConsumerConfig.GROUP_ID_CONFIG to hostName,
                ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG to "true",
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG to "latest",
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG to StringDeserializer::class.java,
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG to StringDeserializer::class.java
        )
    }

    @Bean
    fun producerFactory(): ProducerFactory<String, Any> {
        return DefaultKafkaProducerFactory(producerProperties())
    }

    @Bean
    fun producerProperties(): Map<String, Any> {
        return hashMapOf(
                ProducerConfig.BOOTSTRAP_SERVERS_CONFIG to hosts,
                ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG to StringSerializer::class.java,
                ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG to StringSerializer::class.java
        )
    }

    @Bean
    fun kafkaTemplate(): KafkaTemplate<String, Any> {
        return KafkaTemplate(producerFactory())
    }

    @Bean
    fun objectMapper(): ObjectMapper {
        return ObjectMapper()
    }
}