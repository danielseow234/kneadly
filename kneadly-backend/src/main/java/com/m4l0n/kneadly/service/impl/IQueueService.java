package com.m4l0n.kneadly.service.impl;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.sqs.AmazonSQSAsync;
import com.amazonaws.services.sqs.model.DeleteMessageRequest;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.amazonaws.services.sqs.model.ReceiveMessageResult;
import com.m4l0n.kneadly.exceptions.KneadlyException;
import com.m4l0n.kneadly.service.QueueService;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class IQueueService implements QueueService {


    private static final String QUEUE_NAME_FORMAT = "therapist-%d-queue";
    public static final String COMBINED_QUEUE = "queue-for-sns";
    private final QueueMessagingTemplate queueMessagingTemplate;
    private final AmazonSQSAsync amazonSQSAsync;

    public IQueueService(QueueMessagingTemplate queueMessagingTemplate, AmazonSQSAsync amazonSQSAsync) {
        this.queueMessagingTemplate = queueMessagingTemplate;
        this.amazonSQSAsync = amazonSQSAsync;
    }

    @Override
    public void addAppointmentToQueue(Long appointmentId, Long therapistId, String therapistUserEmail) {
        String queueName = String.format(QUEUE_NAME_FORMAT, therapistId);
        // therapist-specific queue
        queueMessagingTemplate.convertAndSend(queueName, appointmentId.toString());
        // combined queue for sending notification to therapist using Lambda
        queueMessagingTemplate.convertAndSend(COMBINED_QUEUE, therapistUserEmail);
    }

    @Override
    public void removeAppointmentFromQueue(Long therapistId, String receiptHandle) {
        try {
            String queueName = String.format(QUEUE_NAME_FORMAT, therapistId);
            String queueUrl = amazonSQSAsync.getQueueUrl(queueName).getQueueUrl();

            DeleteMessageRequest deleteMessageRequest = new DeleteMessageRequest(queueUrl, receiptHandle);
            amazonSQSAsync.deleteMessageAsync(deleteMessageRequest).get();
        } catch (AmazonServiceException e) {
            throw new KneadlyException("Error deleting message: " + e.getMessage());
        } catch (InterruptedException | ExecutionException e) {
            throw new KneadlyException("Error executing delete operation: " + e.getMessage());
        }
    }

    @Override
    public CompletableFuture<Map<String, String>> retrieveAppointmentFromQueue(Long therapistId) {
        String queueName = String.format(QUEUE_NAME_FORMAT, therapistId);
        String queueUrl = amazonSQSAsync.getQueueUrl(queueName)
                .getQueueUrl();
        ReceiveMessageRequest receiveMessageRequest = new ReceiveMessageRequest()
                .withQueueUrl(queueUrl)
                .withMaxNumberOfMessages(10); // Max value is 10
        try {
            Map<String, String> messages = new HashMap<>();
            ReceiveMessageResult result = amazonSQSAsync.receiveMessageAsync(receiveMessageRequest)
                    .get();
            result.getMessages()
                    .forEach(message -> {
                        messages.put(message.getReceiptHandle(), message.getBody());
                    });
            return CompletableFuture.completedFuture(messages);
        } catch (InterruptedException | ExecutionException e) {
            throw new KneadlyException(e.toString());
        }
    }

}
