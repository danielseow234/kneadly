package com.m4l0n.kneadly.service;

import com.m4l0n.kneadly.dto.KneadlyUserDTO;
import com.m4l0n.kneadly.model.KneadlyUser;

public interface KneadlyUserService {

    Long login(String email, String password);

    Long register(KneadlyUser newUser);

    KneadlyUserDTO updateProfile(KneadlyUser kneadlyUser);

    KneadlyUserDTO getUserById(Long id);
}
