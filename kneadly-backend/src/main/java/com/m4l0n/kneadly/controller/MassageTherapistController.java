package com.m4l0n.kneadly.controller;

import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.MassageTherapistService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/massage-therapist")
public class MassageTherapistController {

    private final MassageTherapistService massageTherapistService;

    public MassageTherapistController(MassageTherapistService massageTherapistService) {
        this.massageTherapistService = massageTherapistService;
    }

    @GetMapping("/get-all")
    public Response getAllMassageTherapists() {
        try {
            return ResponseAPI.positiveResponse(massageTherapistService.getAllMassageTherapists());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

}
