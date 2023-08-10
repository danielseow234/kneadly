package com.m4l0n.kneadly.controller;


import com.amazonaws.xray.spring.aop.XRayEnabled;
import com.m4l0n.kneadly.dto.KneadlyUserDTO;
import com.m4l0n.kneadly.dto.UserLoginDTO;
import com.m4l0n.kneadly.dto.UserRegistrationDTO;
import com.m4l0n.kneadly.mapper.KneadlyUserMapper;
import com.m4l0n.kneadly.model.KneadlyUser;
import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.KneadlyUserService;
import io.micrometer.core.annotation.Timed;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@XRayEnabled
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class KneadlyUserController {

    private final KneadlyUserService kneadlyUserService;
    @Autowired
    private KneadlyUserMapper kneadlyUserMapper;

    private final Counter pageViewsCounter;

    public KneadlyUserController(KneadlyUserService kneadlyUserService, MeterRegistry meterRegistry) {
        this.kneadlyUserService = kneadlyUserService;

        pageViewsCounter = Counter.builder("execution.count.user")
                .tag("counter", "user")
                .register(meterRegistry);

    }

    @PostMapping("/login")
    public Response login(@RequestBody UserLoginDTO userLoginDTO) {
        pageViewsCounter.increment();
        try {
            KneadlyUser kneadlyUser = kneadlyUserMapper.userLoginDtoToEntity(userLoginDTO);
            Long uid = kneadlyUserService.login(kneadlyUser.getUserEmail(), kneadlyUser.getUserPassword());
            return ResponseAPI.positiveResponse(uid);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @PostMapping("/register")
    public Response register(@RequestBody @Valid UserRegistrationDTO newUser) {
        pageViewsCounter.increment();
        try {
            KneadlyUser kneadlyUser = kneadlyUserMapper.userRegistrationDtoToEntity(newUser);
            Long uid = kneadlyUserService.register(kneadlyUser);
            return ResponseAPI.positiveResponse(uid);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @PostMapping("/update")
    public Response update(@RequestBody KneadlyUserDTO newUser) {
        pageViewsCounter.increment();
        try {
            KneadlyUser kneadlyUser = kneadlyUserMapper.kneadlyUserDtoToEntity(newUser);
            KneadlyUserDTO updatedUser = kneadlyUserService.updateProfile(kneadlyUser);
            return ResponseAPI.positiveResponse(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @GetMapping("/{id}")
    public Response getUserById(@PathVariable Long id) {
        pageViewsCounter.increment();
        try {
            KneadlyUserDTO kneadlyUser = kneadlyUserService.getUserById(id);
            return ResponseAPI.positiveResponse(kneadlyUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }
}
