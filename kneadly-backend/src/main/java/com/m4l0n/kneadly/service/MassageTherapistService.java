package com.m4l0n.kneadly.service;

import com.m4l0n.kneadly.model.MassageTherapist;

import java.util.List;

public interface MassageTherapistService {

    void addRating(Integer rating, Long massageTherapistId);

    List<MassageTherapist> getAllMassageTherapists();

}
