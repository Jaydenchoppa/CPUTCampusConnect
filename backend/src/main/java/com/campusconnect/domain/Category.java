package com.campusconnect.domain;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(nullable = false, unique = true, length = 80)
    private String categoryName;

    @Column(columnDefinition = "TEXT")
    private String categoryDesc;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Event> events;
}
