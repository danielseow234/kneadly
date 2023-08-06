package com.m4l0n.kneadly.repository;

import com.m4l0n.kneadly.enums.Role;
import com.m4l0n.kneadly.model.KneadlyUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KneadlyUserRepository extends CrudRepository<KneadlyUser, Long> {

    @Query("select k from KneadlyUser k where k.userId = ?1 and k.userRole = ?2")
    Optional<KneadlyUser> findByIdAndRole(Long userId, Role userRole);

    @Query("SELECT u FROM KneadlyUser u WHERE u.userEmail = ?1")
    KneadlyUser findByEmail(String email);

}
