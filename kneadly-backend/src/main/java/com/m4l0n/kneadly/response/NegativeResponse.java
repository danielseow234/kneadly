package com.m4l0n.kneadly.response;

public class NegativeResponse extends Response{

    public NegativeResponse(StatusCode statusCode, String message, Object result) {
        super(statusCode, message, result);
    }

}
