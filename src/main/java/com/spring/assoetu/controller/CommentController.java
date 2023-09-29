package com.spring.assoetu.controller;

import com.spring.assoetu.entity.Comment;
import com.spring.assoetu.repository.ResponseRepository;
import com.spring.assoetu.service.CommentService;
import com.spring.assoetu.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService ;

    @PostMapping("/save")
    public Comment saveInAssoWithUser(@RequestParam("assoId") Long associationId,
                                      @RequestParam("userId") Long userInfoId,@RequestBody Comment comment) {

        return commentService.saveInAssoWithUser(associationId,userInfoId,comment);
    }

    @PutMapping("/update")
    public Comment updateInAssoWithUser(@RequestParam("assoId") Long associationId,
                                        @RequestParam("userId") Long userInfoId,@RequestBody Comment comment) {

        return commentService.updateInAssoWithUser(associationId,userInfoId,comment);
    }



    @PostMapping("/v1/save")
    public Comment saveComment(@RequestBody Comment comment) {
        return commentService.saveComment(comment);
    }

    @PutMapping("/v1/saveAll")
    public List<Comment> saveAllComment(@RequestBody List<Comment> comments) {

        return commentService.saveAllComment(comments);
    }

    @PostMapping("/v1/update")
    public Comment updateComment(@RequestBody  Comment comment) {
        return commentService.updateComment(comment);
    }

    @PutMapping("/v1/updateAll")
    public List<Comment> updateAllComment(@RequestBody List<Comment> comments) {
        return commentService.updateAllComment(comments);
    }

    @DeleteMapping("/delete")
    public void deleteComment(@RequestBody Comment comment) {

        commentService.deleteComment(comment);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCommentById(@PathVariable("id") Long id) {

        commentService.deleteCommentById(id);
    }

    @GetMapping("/like/{id}")
    public Comment addLike(@PathVariable Long id) {
        return commentService.addLike(id);
    }
    @GetMapping("/dislike/{id}")
    public Comment disLike(@PathVariable Long id) {
        return commentService.addLike(id);
    }

    @GetMapping("/removeLike/{id}")
    public Comment removeLike(@PathVariable("id") Long id) {
        return commentService.removeLike(id);
    }

    @GetMapping("/removeDisLike/{id}")
    public Comment removeDisLike(@PathVariable("id") Long id) {
        return commentService.removeDisLike(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllComment() {

        commentService.deleteAllComment();
    }
}
