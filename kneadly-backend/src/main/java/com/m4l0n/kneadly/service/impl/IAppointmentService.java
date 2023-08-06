package com.m4l0n.kneadly.service.impl;

import com.m4l0n.kneadly.dto.AppointmentActionDTO;
import com.m4l0n.kneadly.dto.AppointmentDTO;
import com.m4l0n.kneadly.dto.GiveFeedbackDTO;
import com.m4l0n.kneadly.enums.Role;
import com.m4l0n.kneadly.exceptions.KneadlyException;
import com.m4l0n.kneadly.mapper.AppointmentMapper;
import com.m4l0n.kneadly.model.Appointment;
import com.m4l0n.kneadly.model.KneadlyUser;
import com.m4l0n.kneadly.repository.AppointmentRepository;
import com.m4l0n.kneadly.repository.KneadlyUserRepository;
import com.m4l0n.kneadly.service.AppointmentService;
import com.m4l0n.kneadly.service.QueueService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class IAppointmentService implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final KneadlyUserRepository userRepository;
    private final QueueService queueService;
    private final AppointmentMapper appointmentMapper;

    public IAppointmentService(AppointmentRepository appointmentRepository, KneadlyUserRepository userRepository, QueueService queueService, AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.queueService = queueService;
        this.appointmentMapper = appointmentMapper;
    }

    @Override
    public AppointmentDTO createAppointment(Appointment appointment) {
        Long clientId = appointment.getAppointmentClient()
                .getUserId();
        Long therapistId = appointment.getAppointmentTherapist()
                .getUserId();
        userRepository.findByIdAndRole(clientId, Role.CLIENT)
                .orElseThrow(() -> new KneadlyException("Client with id " + clientId + " does not exist"));

        KneadlyUser appointmentTherapist = userRepository.findByIdAndRole(therapistId, Role.THERAPIST)
                .orElseThrow(() -> new KneadlyException("Therapist with id " + therapistId + " does not exist"));
        if (!isSlotAvailable(appointment.getAppointmentTherapist()
                .getUserId(), appointment.getAppointmentDate(), appointment.getAppointmentTime())) {
            throw new KneadlyException("Slot not available");
        }
        appointment.setAppointmentIsConfirmed(false);
        Appointment newAppointment = appointmentRepository.save(appointment);
        queueService.addAppointmentToQueue(newAppointment.getAppointmentId(), newAppointment.getAppointmentTherapist()
                .getUserId(), appointmentTherapist.getUserEmail());
        return appointmentMapper.toDto(newAppointment);
    }

    @Override
    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new KneadlyException("Appointment with id " + id + " not found"));
        return appointmentMapper.toDto(appointment);
    }

    @Override
    public AppointmentDTO updateAppointment(Appointment appointment) {
        appointmentRepository.updateDateTime(appointment.getAppointmentDate(), appointment.getAppointmentTime(), appointment.getAppointmentId());
        return appointmentMapper.toDto(appointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public List<AppointmentDTO> getAllTherapistAppointments(Long therapistId) {
        List<Appointment> appointments = appointmentRepository.findByAppointmentTherapistUserId(therapistId);
        return appointments.stream()
                .map(appointmentMapper::toDto)
                .map(this::addTherapistNameToAppointment)
                .toList();
    }

    @Override
    public List<AppointmentDTO> getAllClientAppointments(Long clientId) {
        List<Appointment> appointmentClientUserId = appointmentRepository.findByAppointmentClientUserId(clientId);
        return appointmentClientUserId.stream()
                .map(appointmentMapper::toDto)
                .toList();
    }

    @Override
    public void confirmAppointment(AppointmentActionDTO appointmentActionDTO) {
        appointmentRepository.findById(appointmentActionDTO.id())
                .orElseThrow(() -> new KneadlyException("Appointment with id " + appointmentActionDTO.id() + " not found"));
        queueService.removeAppointmentFromQueue(
                appointmentActionDTO.id(),
                appointmentActionDTO.receiptHandle()
        );
        appointmentRepository.updateAppointmentIsConfirmedByAppointmentId(true, appointmentActionDTO.id());
    }

    @Override
    public void rejectAppointment(AppointmentActionDTO appointmentActionDTO) {
        appointmentRepository.findById(appointmentActionDTO.id())
                .orElseThrow(() -> new KneadlyException("Appointment with id " + appointmentActionDTO.id() + " not found"));
        queueService.removeAppointmentFromQueue(
                appointmentActionDTO.therapistUserId(),
                appointmentActionDTO.receiptHandle()
        );
        appointmentRepository.deleteById(appointmentActionDTO.id());
    }

    @Override
    public Map<String, AppointmentDTO> getAllTherapistUnconfirmedAppointments(Long therapistId) {
        CompletableFuture<Map<String, String>> future = queueService.retrieveAppointmentFromQueue(therapistId);
        try {
            Map<String, String> appointmentQueueMap = future.get();
            return appointmentQueueMap.entrySet()
                    .stream()
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            entry -> getAppointmentById(Long.parseLong(entry.getValue()))
                    ));
        } catch (InterruptedException | ExecutionException e) {
            throw new KneadlyException(e.toString());
        }
    }

    @Override
    public void addFeedback(GiveFeedbackDTO giveFeedbackDTO) {
        appointmentRepository.updateFeedback(
                giveFeedbackDTO.description(),
                giveFeedbackDTO.rating(),
                LocalDate.now(),
                giveFeedbackDTO.appointmentId()
        );
    }

    private boolean isSlotAvailable(Long therapistUserId, LocalDate date, LocalTime time) {
        return appointmentRepository.findByTherapistAndTimeslot(therapistUserId, date, time)
                .isEmpty();
    }

    private AppointmentDTO addTherapistNameToAppointment(AppointmentDTO appointmentDTO) {
        return new AppointmentDTO(
                appointmentDTO.id(),
                appointmentDTO.date(),
                appointmentDTO.time(),
                appointmentDTO.clientUserId(),
                appointmentDTO.therapistUserId(),
                userRepository.findById(appointmentDTO.therapistUserId())
                        .get()
                        .getUserName(),
                appointmentDTO.isConfirmed(),
                appointmentDTO.feedbackMessage(),
                appointmentDTO.feedbackRating(),
                appointmentDTO.feedbackDate()
        );
    }

}
