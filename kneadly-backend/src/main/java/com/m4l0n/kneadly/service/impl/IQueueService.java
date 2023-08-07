package com.m4l0n.kneadly.service.impl;

import com.amazonaws.services.sqs.AmazonSQSAsync;
import com.m4l0n.kneadly.service.QueueService;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class IQueueService implements QueueService {


    public static final String QUEUE_NAME = "queue-for-sns";
    private final QueueMessagingTemplate queueMessagingTemplate;

    public IQueueService(QueueMessagingTemplate queueMessagingTemplate, AmazonSQSAsync amazonSQSAsync) {
        this.queueMessagingTemplate = queueMessagingTemplate;
    }

    @Override
    public void addAppointmentToQueue(Long therapistId, String therapistUserEmail) {
        // combined queue for sending notification to therapist using Lambda
        queueMessagingTemplate.convertAndSend(QUEUE_NAME, therapistUserEmail);
    }


}
