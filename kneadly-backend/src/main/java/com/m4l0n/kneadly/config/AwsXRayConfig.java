package com.m4l0n.kneadly.config;

import com.amazonaws.xray.jakarta.servlet.AWSXRayServletFilter;
import jakarta.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsXRayConfig {

    @Bean
    public Filter TracingFilter() {
        return new AWSXRayServletFilter("Kneadly-app");
    }
}