package com.campusconnect.service;

import com.campusconnect.domain.Event;
import com.campusconnect.domain.Event.Status;
import com.campusconnect.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> getUpcomingEvents() {
        return eventRepository.findByEventDateAfter(LocalDate.now());
    }

    public List<Event> getEventsByStatus(Status status) {
        return eventRepository.findByStatus(status);
    }

    public List<Event> getEventsByCategory(Long categoryId) {
        return eventRepository.findByCategory_CategoryId(categoryId);
    }

    public List<Event> searchEventsByKeyword(String keyword) {
        return eventRepository.findByEventTitleContainingIgnoreCase(keyword);
    }

    public List<Event> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizer_UserId(organizerId);
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
