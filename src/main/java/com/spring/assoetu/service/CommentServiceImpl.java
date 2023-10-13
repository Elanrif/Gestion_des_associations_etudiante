package com.spring.assoetu.service;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Comment;
import com.spring.assoetu.entity.UserInfo;
import com.spring.assoetu.repository.AssociationRepository;
import com.spring.assoetu.repository.CommentRepository;
import com.spring.assoetu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepository commentRepository ;
    @Autowired
    private AssociationRepository associationRepository ;
    @Autowired
    private UserRepository userRepository ;

    @Override
    public Comment saveInAssoWithUser(Long associationId, Long userInfoId, Comment comment) {

        Association association = associationRepository.findById(associationId).orElse(null) ;
        UserInfo userInfo = userRepository.findById(userInfoId).get() ;

        if(association != null && userInfo !=null) {

            comment.setDate(LocalDate.now());

            association.addComments(comment);
            userInfo.addComments(comment);

            /*il suffit d'enregistrer le comment , les cascades s'occuperont d'enregistrer l'asso et userInfo*/
            return commentRepository.save(comment) ;
        }

        return null;
    }

    @Override
    public Comment update(Comment comment) {

        Comment commnt = commentRepository.findById(comment.getId()).orElse(null) ;

        // Association association = associationRepository.findById(associationId).orElse(null) ;
      //  UserInfo userInfo = userRepository.findById(userInfoId).get() ;

        if(commnt != null) {

            commnt.setDate(LocalDate.now());
            commnt.setContent(comment.getContent());
          //  association.addComments(comment);
          //  userInfo.addComments(comment);
            /*il suffit d'enregistrer le comment , les cascades s'occuperont d'enregistrer l'asso et userInfo*/
            return commentRepository.save(commnt) ;
        }

        return null;
    }

    @Override
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> saveAllComment(List<Comment> comments) {
        return commentRepository.saveAll(comments);
    }

    @Override
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> updateAllComment(List<Comment> comments) {
        return commentRepository.saveAll(comments);
    }

    @Override
    public void deleteComment(Comment comment) {
        commentRepository.delete(comment);
    }

    @Override
    public void deleteCommentById(Long id) {
        commentRepository.deleteById(id);
    }

    //chaque clique on ajoute un Like.
    @Override
    public Comment addLike(Long commentId) {

        Comment co = commentRepository.findById(commentId).orElse(null);

        if (co != null) {
            Long currentLikes = co.getLiked();
            co.setLiked(currentLikes + 1);
            commentRepository.save(co);
        }

        return co;
    }

    //chaque clique on ajoute un DisLike.
    @Override
    public Comment disLike(Long commentId) {
        Comment co = commentRepository.findById(commentId).orElse(null);

        if (co != null  ) {
            Long currentDisLikes = co.getDisliked();
            co.setDisliked(currentDisLikes + 1);
            commentRepository.save(co);
        }

        return co;
    }

    @Override
    public Comment removeLike(Long commentId) {
        Comment co = commentRepository.findById(commentId).orElse(null);

        if (co != null && co.getLiked() > 0 ) {
            Long currentDisLikes = co.getLiked();
            co.setLiked(currentDisLikes - 1);
            commentRepository.save(co);
        }

        return co;
    }

    @Override
    public Comment removeDisLike(Long commentId) {
        Comment co = commentRepository.findById(commentId).orElse(null);

        if (co != null && co.getDisliked() > 0  ) {
            Long currentDisLikes = co.getDisliked();
            co.setDisliked(currentDisLikes + 1);
            commentRepository.save(co);
        }
        return co;
    }

    @Override
    public void deleteAllComment() {
        commentRepository.deleteAll();
    }

    @Override
    public List<Comment> findAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> findAllCommentsByAssociation(Long id) {
        Association association = associationRepository.findById(id).get() ;

        if(association != null) {
            return association.getComments() ;
        }
        return null;
    }

    @Override
    public List<Comment> findByContentContaining(String name) {
        return commentRepository.findByContentContaining(name);
    }

    @Override
    public List<Comment> findAllByOrderByDateAsc() {
        return commentRepository.findAllByOrderByDateAsc();
    }

    @Override
    public List<Comment> findAllByOrderByDateDesc() {
        return commentRepository.findAllByOrderByDateDesc();
    }
}
