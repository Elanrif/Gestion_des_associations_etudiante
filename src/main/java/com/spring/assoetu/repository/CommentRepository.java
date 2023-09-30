package com.spring.assoetu.repository;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByContentContaining(String name) ;
    List<Comment> findAllByOrderByDateAsc();
    List<Comment> findAllByOrderByDateDesc();
}

