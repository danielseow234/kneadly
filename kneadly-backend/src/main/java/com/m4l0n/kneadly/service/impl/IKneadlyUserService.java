package com.m4l0n.kneadly.service.impl;

import com.m4l0n.kneadly.exceptions.KneadlyException;
import com.m4l0n.kneadly.model.KneadlyUser;
import com.m4l0n.kneadly.repository.KneadlyUserRepository;
import com.m4l0n.kneadly.service.KneadlyUserService;
import org.springframework.stereotype.Service;

@Service
public class IKneadlyUserService implements KneadlyUserService {

    private final KneadlyUserRepository kneadlyUserRepository;

    public IKneadlyUserService(KneadlyUserRepository kneadlyUserRepository) {
        this.kneadlyUserRepository = kneadlyUserRepository;
    }

    @Override
    public Long login(String email, String password) {
        KneadlyUser kneadlyUser = kneadlyUserRepository.findByEmail(email);
        if (kneadlyUser == null) {
            throw new KneadlyException("User not found");
        }
        if (!kneadlyUser.getPassword().equals(password)) {
            throw new KneadlyException("Password is incorrect");
        }
        return kneadlyUser.getId();
    }

    @Override
    public Long register(KneadlyUser newUser) {
        if (kneadlyUserRepository.findByEmail(newUser.getEmail()) != null) {
            throw new KneadlyException("Email already in use.");
        }

        return kneadlyUserRepository.save(newUser).getId();
    }
}
