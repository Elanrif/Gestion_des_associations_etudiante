package com.spring.assoetu.service;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Comment;
import com.spring.assoetu.entity.Comment;
import com.spring.assoetu.entity.UserInfo;
import com.spring.assoetu.repository.CommentRepository;

import java.util.List;

public interface CommentService  {


    public Comment saveInAssoWithUser(Long  associationId , Long userInfoId , Comment comment) ;
    public Comment updateInAssoWithUser(Long  associationId , Long userInfoId , Comment comment) ;
    public Comment saveComment(Comment comment) ;
    public List<Comment> saveAllComment(List<Comment> comments) ;
    public Comment updateComment(Comment comment);
    public List<Comment> updateAllComment(List<Comment> comments) ;
    public void deleteComment(Comment comment);
    public void deleteCommentById(Long id) ;
    public Comment addLike(Long commentId) ;
    public Comment disLike(Long commentId) ;
    public Comment removeLike(Long commentId) ;
    public Comment removeDisLike(Long commentId) ;
    public void deleteAllComment() ;
    public List<Comment> findAllComments();
    public List<Comment> findAllCommentsByAssociation(Long id) ;
    List<Comment> findByContentContaining(String name) ;
    List<Comment> findAllByOrderByDateAsc();
    List<Comment> findAllByOrderByDateDesc();

}
