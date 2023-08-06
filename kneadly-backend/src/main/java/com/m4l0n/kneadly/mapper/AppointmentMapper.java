package com.m4l0n.kneadly.mapper;

import com.m4l0n.kneadly.dto.AppointmentActionDTO;
import com.m4l0n.kneadly.dto.AppointmentDTO;
import com.m4l0n.kneadly.dto.CreateAppointmentDTO;
import com.m4l0n.kneadly.model.Appointment;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface AppointmentMapper {
    @Mapping(source = "isConfirmed", target = "appointmentIsConfirmed")
    @Mapping(source = "therapistUserId", target = "appointmentTherapist.userId")
    @Mapping(source = "clientUserId", target = "appointmentClient.userId")
    @Mapping(source = "date", target = "appointmentDate")
    @Mapping(source = "time", target = "appointmentTime")
    @Mapping(source = "id", target = "appointmentId")
    @Mapping(source = "feedbackMessage", target = "appointmentFeedbackMessage")
    @Mapping(source = "feedbackRating", target = "appointmentFeedbackRating")
    @Mapping(source = "feedbackDate", target = "appointmentFeedbackDate")
    Appointment toEntity(AppointmentDTO appointmentDto);

    @InheritInverseConfiguration(name = "toEntity")
    AppointmentDTO toDto(Appointment appointment);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Appointment partialUpdate(AppointmentDTO appointmentDto, @MappingTarget Appointment appointment);

    @Mapping(source = "therapistUserId", target = "appointmentTherapist.userId")
    @Mapping(source = "clientUserId", target = "appointmentClient.userId")
    @Mapping(source = "date", target = "appointmentDate")
    @Mapping(source = "time", target = "appointmentTime")
    Appointment toEntity(CreateAppointmentDTO createAppointmentDTO);

    @InheritInverseConfiguration(name = "toEntity")
    CreateAppointmentDTO toCreateAppointmentDTO(Appointment appointment);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Appointment partialUpdate(CreateAppointmentDTO createAppointmentDTO, @MappingTarget Appointment appointment);

    @Mapping(source = "therapistUserId", target = "appointmentTherapist.userId")
    @Mapping(source = "id", target = "appointmentId")
    Appointment toEntity(AppointmentActionDTO appointmentActionDTO);

    @InheritInverseConfiguration(name = "toEntity")
    AppointmentActionDTO toAppointmentActionDTO(Appointment appointment);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Appointment partialUpdate(AppointmentActionDTO appointmentActionDTO, @MappingTarget Appointment appointment);
}