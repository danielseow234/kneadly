package com.m4l0n.kneadly.kneadly.service.impl;

import com.m4l0n.kneadly.kneadly.service.TestService;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class TestServiceImpl implements TestService {

    private final S3Client s3Client;
    private static final String BUCKET_NAME = "mvcflowershoplab13";

    public TestServiceImpl(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public String readFile() throws IOException {
        ResponseInputStream<GetObjectResponse> response = s3Client.getObject(
                request -> request.bucket(BUCKET_NAME)
                        .key("test.txt"));

        String fileContent = StreamUtils.copyToString(response, StandardCharsets.UTF_8);

        return fileContent;
    }

    @Override
    public List<String> listFiles() throws IOException {
        return s3Client.listObjects(request -> request.bucket("mvcflowershoplab13"))
                .contents()
                .stream()
                .map(S3Object::key)
                .toList();
    }
}
