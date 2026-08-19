package com.campusconnect.service;

import com.campusconnect.model.Registration;
import com.campusconnect.repository.RegistrationRepository;
import com.campusconnect.repository.EventRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;

    public RegistrationService(RegistrationRepository registrationRepository,
                               EventRepository eventRepository) {
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
    }

    public List<Registration> getRegistrationsByEvent(Long eventId) {
        return registrationRepository.findByEvent_EventId(eventId);
    }

    public List<Registration> getRegistrationsByUser(UUID userId) {
        return registrationRepository.findByUser_UserId(userId);
    }

    public Boolean isUserRegistered(UUID userId, Long eventId) {
        return registrationRepository.existsByUser_UserIdAndEvent_EventId(userId, eventId);
    }

    public Registration saveRegistration(Registration registration) {
        Long eventId = registration.getEvent().getEventId();
        Integer currentCount = registrationRepository.countByEvent_EventId(eventId);
        Integer capacity = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"))
                .getEventCapacity();

        if (currentCount >= capacity) {
            throw new RuntimeException("Event is fully booked");
        }
        return registrationRepository.save(registration);
    }

    public void deleteRegistration(Long id) {
        registrationRepository.deleteById(id);
    }
}