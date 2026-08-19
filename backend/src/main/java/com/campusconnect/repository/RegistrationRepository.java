package com.campusconnect.repository;

import com.campusconnect.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    List<Registration> findByEvent_EventId(Long eventId);

    List<Registration> findByUser_UserId(UUID userId);

    Optional<Registration> findByUser_UserIdAndEvent_EventId(UUID userId, Long eventId);

    Boolean existsByUser_UserIdAndEvent_EventId(UUID userId, Long eventId);

    Integer countByEvent_EventId(Long eventId);
}