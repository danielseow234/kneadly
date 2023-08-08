package com.m4l0n.kneadly.controller;


import com.m4l0n.kneadly.dto.KneadlyUserDTO;
import com.m4l0n.kneadly.dto.UserLoginDTO;
import com.m4l0n.kneadly.dto.UserRegistrationDTO;
import com.m4l0n.kneadly.mapper.KneadlyUserMapper;
import com.m4l0n.kneadly.model.KneadlyUser;
import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.KneadlyUserService;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class KneadlyUserController {

    private final KneadlyUserService kneadlyUserService;
    @Autowired
    private KneadlyUserMapper kneadlyUserMapper;

    private final Counter pageViewsCounter;
    private final Timer userTimer;

    public KneadlyUserController(KneadlyUserService kneadlyUserService, MeterRegistry meterRegistry) {
        this.kneadlyUserService = kneadlyUserService;

        pageViewsCounter = meterRegistry
                .counter("PAGE_VIEWS.User");

        userTimer = meterRegistry
                .timer("execution.time.user");
    }

    @PostMapping("/login")
    public Response login(@RequestBody UserLoginDTO userLoginDTO) {
        long startTime = System.currentTimeMillis();
        pageViewsCounter.increment();
        try {
            KneadlyUser kneadlyUser = kneadlyUserMapper.userLoginDtoToEntity(userLoginDTO);
            Long uid = kneadlyUserService.login(kneadlyUser.getUserEmail(), kneadlyUser.getUserPassword());
            return ResponseAPI.positiveResponse(uid);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        } finally {
            userTimer.record(Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }

    @PostMapping("/register")
    public Response register(@RequestBody @Valid UserRegistrationDTO newUser) {
        long startTime = System.currentTimeMillis();
        pageViewsCounter.increment();
        try {
            KneadlyUser kneadlyUser = kneadlyUserMapper.userRegistrationDtoToEntity(newUser);
            Long uid = kneadlyUserService.register(kneadlyUser);
            return ResponseAPI.positiveResponse(uid);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        } finally {
            userTimer.record(Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }

    @PostMapping("/update")
    public Response update(@RequestBody KneadlyUserDTO newUser) {
        long startTime = System.currentTimeMillis();
        pageViewsCounter.increment();
        try {
            KneadlyUser kneadlyUser = kneadlyUserMapper.kneadlyUserDtoToEntity(newUser);
            KneadlyUserDTO updatedUser = kneadlyUserService.updateProfile(kneadlyUser);
            return ResponseAPI.positiveResponse(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        } finally {
            userTimer.record(Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }

    @GetMapping("/{id}")
    public Response getUserById(@PathVariable Long id) {
        long startTime = System.currentTimeMillis();
        pageViewsCounter.increment();
        try {
            KneadlyUserDTO kneadlyUser = kneadlyUserService.getUserById(id);
            return ResponseAPI.positiveResponse(kneadlyUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        } finally {
            userTimer.record(Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }
}
