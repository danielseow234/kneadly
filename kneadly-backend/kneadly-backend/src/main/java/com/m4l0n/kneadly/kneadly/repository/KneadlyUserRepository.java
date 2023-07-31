package com.m4l0n.kneadly.kneadly.repository;

import com.m4l0n.kneadly.kneadly.model.KneadlyUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KneadlyUserRepository extends CrudRepository<KneadlyUser, Long> {

    @Query("SELECT u FROM KneadlyUser u WHERE u.email = ?1")
    KneadlyUser findByEmail(String email);

}
