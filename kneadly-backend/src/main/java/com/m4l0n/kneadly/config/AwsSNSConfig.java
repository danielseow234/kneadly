package com.m4l0n.kneadly.config;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsAsyncClient;

@Configuration
public class AwsSNSConfig {

    @Value("${spring.cloud.aws.region.static}")
    private String awsRegion;

    @Bean
    public SnsAsyncClient snsAsyncClient() {
        return SnsAsyncClient.builder()
                .credentialsProvider(DefaultCredentialsProvider.create())
                .region(Region.of(awsRegion))
                .build();
    }

}
