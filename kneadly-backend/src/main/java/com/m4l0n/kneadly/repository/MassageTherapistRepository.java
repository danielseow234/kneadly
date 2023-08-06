package com.m4l0n.kneadly.repository;

import com.m4l0n.kneadly.model.MassageTherapist;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface MassageTherapistRepository extends CrudRepository<MassageTherapist, Long> {

}
