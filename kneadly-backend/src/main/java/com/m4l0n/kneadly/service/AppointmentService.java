package com.m4l0n.kneadly.service;


import com.m4l0n.kneadly.dto.AppointmentActionDTO;
import com.m4l0n.kneadly.dto.AppointmentDTO;
import com.m4l0n.kneadly.dto.GiveFeedbackDTO;
import com.m4l0n.kneadly.model.Appointment;

import java.util.List;
import java.util.Map;

public interface AppointmentService {

    AppointmentDTO createAppointment(Appointment appointment);

    AppointmentDTO getAppointmentById(Long id);

    AppointmentDTO updateAppointment(Appointment appointment);

    void deleteAppointment(Long id);

    List<AppointmentDTO> getAllTherapistAppointments(Long therapistId);

    List<AppointmentDTO> getAllClientAppointments(Long clientId);

    void confirmAppointment(AppointmentActionDTO id);

    void rejectAppointment(AppointmentActionDTO id);

    List<AppointmentDTO> getAllTherapistUnconfirmedAppointments(Long therapistId);

    void addFeedback(GiveFeedbackDTO giveFeedbackDTO);
}
