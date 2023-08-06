package com.m4l0n.kneadly.service.impl;

import com.m4l0n.kneadly.dto.KneadlyUserDTO;
import com.m4l0n.kneadly.enums.Role;
import com.m4l0n.kneadly.exceptions.KneadlyException;
import com.m4l0n.kneadly.mapper.KneadlyUserMapper;
import com.m4l0n.kneadly.model.KneadlyUser;
import com.m4l0n.kneadly.repository.KneadlyUserRepository;
import com.m4l0n.kneadly.service.KneadlyUserService;
import org.springframework.stereotype.Service;

@Service
public class IKneadlyUserService implements KneadlyUserService {

    private final KneadlyUserRepository kneadlyUserRepository;
    private final KneadlyUserMapper kneadlyUserMapper;

    public IKneadlyUserService(KneadlyUserRepository kneadlyUserRepository, KneadlyUserMapper kneadlyUserMapper) {
        this.kneadlyUserRepository = kneadlyUserRepository;
        this.kneadlyUserMapper = kneadlyUserMapper;
    }

    @Override
    public Long login(String email, String password) {
        KneadlyUser kneadlyUser = kneadlyUserRepository.findByEmail(email);
        if (kneadlyUser == null) {
            throw new KneadlyException("User not found");
        }
        if (!kneadlyUser.getUserPassword().equals(password)) {
            throw new KneadlyException("Password is incorrect");
        }
        return kneadlyUser.getUserId();
    }

    @Override
    public Long register(KneadlyUser newUser) {
        if (kneadlyUserRepository.findByEmail(newUser.getUserEmail()) != null) {
            throw new KneadlyException("Email already in use.");
        }
        newUser.setUserRole(Role.CLIENT);
        return kneadlyUserRepository.save(newUser).getUserId();
    }

    @Override
    public KneadlyUserDTO updateProfile(KneadlyUser kneadlyUser) {
        KneadlyUser userToUpdate = kneadlyUserRepository.findById(kneadlyUser.getUserId())
                .orElseThrow(() -> new KneadlyException("User not found"));
        kneadlyUser.setUserPassword(userToUpdate.getUserPassword());
        kneadlyUserRepository.save(kneadlyUser);
        return kneadlyUserMapper.entityToKneadlyUserDto(kneadlyUser);
    }

    @Override
    public KneadlyUserDTO getUserById(Long id) {
        KneadlyUser kneadlyUser = kneadlyUserRepository.findById(id)
                .orElse(null);
        if (kneadlyUser == null) {
            throw new KneadlyException("User not found");
        } else {
            return kneadlyUserMapper.entityToKneadlyUserDto(kneadlyUser);
        }
    }
}
