package com.g2appdev.teambangan.repository;

import com.g2appdev.teambangan.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
}
