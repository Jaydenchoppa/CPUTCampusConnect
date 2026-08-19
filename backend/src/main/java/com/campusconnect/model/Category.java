package com.campusconnect.model;

import jakarta.persistence.*;
import java.util.List;

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

    public Category() {}

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public String getCategoryDesc() { return categoryDesc; }
    public void setCategoryDesc(String categoryDesc) { this.categoryDesc = categoryDesc; }
    public List<Event> getEvents() { return events; }
    public void setEvents(List<Event> events) { this.events = events; }
}