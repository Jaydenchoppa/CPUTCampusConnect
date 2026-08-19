package com.campusconnect.controller;

import com.campusconnect.model.Registration;
import com.campusconnect.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @GetMapping("/event/{eventId}")
    public List<Registration> getRegistrationsByEvent(@PathVariable Long eventId) {
        return registrationService.getRegistrationsByEvent(eventId);
    }

    @GetMapping("/user/{userId}")
    public List<Registration> getRegistrationsByUser(@PathVariable UUID userId) {
        return registrationService.getRegistrationsByUser(userId);
    }

    @PostMapping
    public ResponseEntity<?> registerForEvent(@RequestBody Registration registration) {
        try {
            return ResponseEntity.ok(registrationService.saveRegistration(registration));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/attend")
    public ResponseEntity<?> markAttendance(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(registrationService.markAttended(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/event/{eventId}/attendees")
    public List<Registration> getAttendeeList(@PathVariable Long eventId) {
        return registrationService.getAttendeeList(eventId);
    }
}