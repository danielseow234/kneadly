package com.m4l0n.kneadly.controller;

import com.m4l0n.kneadly.dto.UserLoginDTO;
import com.m4l0n.kneadly.dto.UserRegistrationDTO;
import com.m4l0n.kneadly.mapper.KneadlyUserMapper;
import com.m4l0n.kneadly.model.KneadlyUser;
import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.KneadlyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/user")
public class KneadlyUserController {

    private final KneadlyUserService kneadlyUserService;
    @Autowired
    private KneadlyUserMapper kneadlyUserMapper;

    public KneadlyUserController(KneadlyUserService kneadlyUserService) {
        this.kneadlyUserService = kneadlyUserService;
    }

    @PostMapping("/login")
    public Response login(@RequestBody UserLoginDTO userLoginDTO) {
        try {
            KneadlyUser kneadlyUser = kneadlyUserMapper.userLoginDTOToKneadlyUser(userLoginDTO);
            Long uid = kneadlyUserService.login(kneadlyUser.getEmail(), kneadlyUser.getPassword());
            return ResponseAPI.positiveResponse(uid);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @PostMapping("/register")
    public Response register(@RequestBody UserRegistrationDTO newUser) {
        try {
            KneadlyUser kneadlyUser = kneadlyUserMapper.userRegistrationDTOToKneadlyUser(newUser);
            Long uid = kneadlyUserService.register(kneadlyUser);
            return ResponseAPI.positiveResponse(uid);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }
}
