package com.m4l0n.kneadly.advice;

import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ValidationHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Response handleValidationErrors(MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();
        ex.getBindingResult()
                .getAllErrors()
                .forEach((error) -> {
                    String errorMessage = error.getDefaultMessage();
                    errors.add(errorMessage);
                });
        return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, errors.toString(), null);
    }

}
