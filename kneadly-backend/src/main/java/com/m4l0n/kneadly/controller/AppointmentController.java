package com.m4l0n.kneadly.controller;

import com.m4l0n.kneadly.dto.AppointmentActionDTO;
import com.m4l0n.kneadly.dto.AppointmentDTO;
import com.m4l0n.kneadly.dto.CreateAppointmentDTO;
import com.m4l0n.kneadly.dto.GiveFeedbackDTO;
import com.m4l0n.kneadly.mapper.AppointmentMapper;
import com.m4l0n.kneadly.model.Appointment;
import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping(value = "/appointment", produces = MediaType.APPLICATION_JSON_VALUE)
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppointmentMapper appointmentMapper;

    public AppointmentController(AppointmentService appointmentService, AppointmentMapper appointmentMapper) {
        this.appointmentService = appointmentService;
        this.appointmentMapper = appointmentMapper;
    }

    @PostMapping("/create")
    public Response createAppointment(@RequestBody @Valid CreateAppointmentDTO appointment) {
        log.info("Creating appointment");
        try {
            Appointment newAppointment = appointmentMapper.toEntity(appointment);
            log.info("Appointment created");
            return ResponseAPI.positiveResponse(appointmentService.createAppointment(newAppointment));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @GetMapping("/{id}")
    public Response getAppointmentById(@PathVariable Long id) {
        log.info("Getting appointment by id");
        try {
            log.info("Appointment found");
            return ResponseAPI.positiveResponse(appointmentService.getAppointmentById(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @PutMapping("/{id}")
    public Response updateAppointment(@RequestBody AppointmentDTO appointment) {
        log.info("Updating appointment");
        try {
            Appointment newAppointment = appointmentMapper.toEntity(appointment);
            log.info("Appointment updated");
            return ResponseAPI.positiveResponse(appointmentService.updateAppointment(newAppointment));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @DeleteMapping("/{id}")
    public Response deleteAppointment(@PathVariable Long id) {
        log.info("Deleting appointment");
        try {
            appointmentService.deleteAppointment(id);
            log.info("Appointment deleted");
            return ResponseAPI.positiveResponse("Appointment deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @GetMapping("/confirmed/therapist/{therapistId}")
    public Response getAllTherapistConfirmedAppointments(@PathVariable Long therapistId) {
        log.info("Getting all therapist appointments");
        try {
            log.info("Appointments found");
            return ResponseAPI.positiveResponse(appointmentService.getAllTherapistAppointments(therapistId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @GetMapping("/unconfirmed/therapist/{therapistId}")
    public Response getAllTherapistUnconfirmedAppointments(@PathVariable Long therapistId) {
        log.info("Getting all therapist unconfirmed appointments");
        try {
            log.info("Appointments found");
            return ResponseAPI.positiveResponse(appointmentService.getAllTherapistUnconfirmedAppointments(therapistId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @GetMapping("/client/{clientId}")
    public Response getAllClientAppointments(@PathVariable Long clientId) {
        log.info("Getting all client appointments");
        try {
            log.info("Appointments found");
            return ResponseAPI.positiveResponse(appointmentService.getAllClientAppointments(clientId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @PostMapping("/confirm")
    public Response confirmAppointment(@RequestBody @Valid AppointmentActionDTO appointmentActionDTO) {
        log.info("Confirming appointment");
        try {
            log.info("Appointment confirmed");
            appointmentService.confirmAppointment(appointmentActionDTO);
            return ResponseAPI.emptyPositiveResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @PostMapping("/reject")
    public Response rejectAppointment(@RequestBody @Valid AppointmentActionDTO appointmentActionDTO) {
        log.info("Rejecting appointment");
        try {
            log.info("Appointment rejected");
            appointmentService.rejectAppointment(appointmentActionDTO);
            return ResponseAPI.emptyPositiveResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @PostMapping("/feedback")
    public Response addFeedback(@RequestBody @Valid GiveFeedbackDTO giveFeedbackDTO) {
        log.info("Adding feedback");
        try {
            log.info("Feedback added");
            appointmentService.addFeedback(giveFeedbackDTO);
            return ResponseAPI.emptyPositiveResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

}
