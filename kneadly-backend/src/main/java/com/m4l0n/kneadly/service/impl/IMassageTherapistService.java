package com.m4l0n.kneadly.service.impl;

import com.m4l0n.kneadly.exceptions.KneadlyException;
import com.m4l0n.kneadly.model.MassageTherapist;
import com.m4l0n.kneadly.repository.MassageTherapistRepository;
import com.m4l0n.kneadly.service.MassageTherapistService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class IMassageTherapistService implements MassageTherapistService {

    private final MassageTherapistRepository massageTherapistRepository;

    public IMassageTherapistService(MassageTherapistRepository massageTherapistRepository) {
        this.massageTherapistRepository = massageTherapistRepository;
    }

    @Override
    public void addRating(Integer rating, Long massageTherapistId) {
        massageTherapistRepository.findById(massageTherapistId)
                .ifPresentOrElse(massageTherapist -> {
                    massageTherapist.addRating(rating);
                    massageTherapistRepository.save(massageTherapist);
                }, () -> {
                    throw new KneadlyException("Massage therapist not found");
                });
    }

    @Override
    public List<MassageTherapist> getAllMassageTherapists() {
        List<MassageTherapist> massageTherapists = new ArrayList<>();
        massageTherapistRepository.findAll()
                .forEach(massageTherapists::add);
        return massageTherapists;
    }

}
