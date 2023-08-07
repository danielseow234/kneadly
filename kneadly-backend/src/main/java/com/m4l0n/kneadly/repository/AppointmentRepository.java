package com.m4l0n.kneadly.repository;

import com.m4l0n.kneadly.model.Appointment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

    @Query("select a from Appointment a where a.appointmentTherapist.userId = ?1 and a.appointmentIsConfirmed = ?2")
    List<Appointment> findByTherapistAndStatus(Long userId, Boolean appointmentIsConfirmed);
    @Transactional
    @Modifying
    @Query("""
            update Appointment a set a.appointmentFeedbackMessage = ?1, a.appointmentFeedbackRating = ?2, a.appointmentFeedbackDate = ?3
            where a.appointmentId = ?4""")
    void updateFeedback(String appointmentFeedbackMessage, Integer appointmentFeedbackRating, LocalDate appointmentFeedbackDate, Long appointmentId);
    @Transactional
    @Modifying
    @Query("update Appointment a set a.appointmentDate = ?1, a.appointmentTime = ?2 where a.appointmentId = ?3")
    void updateDateTime(LocalDate appointmentDate, LocalTime appointmentTime, Long appointmentId);
    @Query("""
            select a from Appointment a
            where a.appointmentTherapist.userId = ?1 and a.appointmentDate = ?2 and a.appointmentTime = ?3""")
    Optional<Appointment> findByTherapistAndTimeslot(Long userId, LocalDate appointmentDate, LocalTime appointmentTime);
    @Transactional
    @Modifying
    @Query("update Appointment a set a.appointmentIsConfirmed = ?1 where a.appointmentId = ?2")
    int updateAppointmentIsConfirmedByAppointmentId(Boolean appointmentIsConfirmed, Long appointmentId);

    @Query("select a from Appointment a where a.appointmentClient.userId = ?1")
    List<Appointment> findByAppointmentClientUserId(Long userId);

    @Query("select a from Appointment a where a.appointmentTherapist.userId = ?1 and a.appointmentIsConfirmed = true")
    List<Appointment> findByAppointmentTherapistUserId(Long userId);

}
