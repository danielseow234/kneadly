package com.m4l0n.kneadly.service;

import com.m4l0n.kneadly.dto.NewsletterDTO;

import java.util.concurrent.ExecutionException;

public interface NewsletterService {

    void subscribe(String email) ;

    void sendNewsletter(NewsletterDTO newsletterDTO);

}
