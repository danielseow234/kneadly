package com.m4l0n.kneadly.service.impl;

import com.m4l0n.kneadly.dto.NewsletterDTO;
import com.m4l0n.kneadly.service.NewsletterService;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsAsyncClient;
import software.amazon.awssdk.services.sns.model.SubscribeRequest;

import java.util.concurrent.ExecutionException;

@Service
public class INewsletterService implements NewsletterService {

    private final SnsAsyncClient snsClient;
    private static final String NEWSLETTER_ARN = "arn:aws:sns:us-east-1:200078265423:KneadlyNewsletter";

    public INewsletterService(SnsAsyncClient snsClient) {
        this.snsClient = snsClient;
    }


    @Override
    public void subscribe(String email) {
        SubscribeRequest request = SubscribeRequest.builder()
                .topicArn(NEWSLETTER_ARN)
                .protocol("email")
                .endpoint(email)
                .build();
        snsClient.subscribe(request);
    }

    @Override
    public void sendNewsletter(NewsletterDTO newsletterDTO) {
        snsClient.publish(request -> request
                .topicArn(NEWSLETTER_ARN)
                .subject(newsletterDTO.topic())
                .message(newsletterDTO.message()));
    }

}
