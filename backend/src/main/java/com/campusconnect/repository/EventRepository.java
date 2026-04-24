package com.campusconnect.repository;

import com.campusconnect.domain.Event;
import com.campusconnect.domain.Event.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByStatus(Status status);

    List<Event> findByEventDateAfter(LocalDate date);

    List<Event> findByCategory_CategoryId(Long categoryId);

    List<Event> findByEventTitleContainingIgnoreCase(String keyword);

    List<Event> findByOrganizer_UserId(Long organizerId);
}
