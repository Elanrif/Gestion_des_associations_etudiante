package com.spring.assoetu.service;

import com.spring.assoetu.entity.Comment;
import com.spring.assoetu.entity.Response;
import com.spring.assoetu.entity.UserInfo;
import com.spring.assoetu.repository.CommentRepository;
import com.spring.assoetu.repository.ResponseRepository;
import com.spring.assoetu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ResponseServiceImpl implements ResponseService {

    @Autowired
    private ResponseRepository responseRepository ;
    @Autowired
    private CommentRepository commentRepository ;
    @Autowired
    private UserRepository userRepository ;

    /*on prendra comme paramètre les ID des entités en relation avec notre entité qu'on traite.*/
    @Override
    public Response save(Long commentId, Long userReplyId, Response response) {

        Comment comment = commentRepository.findById(commentId).get() ;
        UserInfo userReply = userRepository.findById(userReplyId).orElse(null);

        if(comment != null && userReply != null) {

            response.setDate(LocalDate.now());
            comment.addResponses(response);
            userReply.addResponses(response);
            return responseRepository.save(response) ;
        }

        return null;
    }

    @Override
    public Response update(Long commentId, Long userReplyId, Response response) {

        Comment comment = commentRepository.findById(commentId).orElse(null) ;
        UserInfo userReply = userRepository.findById(userReplyId).orElse(null);

        if(comment != null && userReply != null) {

            response.setDate(LocalDate.now());
            comment.addResponses(response);
            userReply.addResponses(response);
            return responseRepository.save(response) ;
        }

        return null;
    }

    @Override
    public Response saveResponse(Response response) {
        return responseRepository.save(response);
    }

    @Override
    public List<Response> saveAllResponse(List<Response> responses) {
        return responseRepository.saveAll(responses);
    }

    @Override
    public Response updateResponse(Response response) {
        return responseRepository.save(response);
    }

    @Override
    public List<Response> updateAllResponse(List<Response> responses) {
        return responseRepository.saveAll(responses);
    }

    @Override
    public void deleteResponse(Response response) {
        responseRepository.delete(response);
    }

    @Override
    public Response addLike(Long responseId) {
        Response res = responseRepository.findById(responseId).orElse(null);

        if (res != null) {
            Long currentLikes = res.getLiked();
            res.setLiked(currentLikes + 1);
            responseRepository.save(res);
        }

        return res;
    }

    @Override
    public Response disLike(Long responseId) {
        Response res = responseRepository.findById(responseId).orElse(null);

        if (res != null) {
            Long currentLikes = res.getDisliked();
            res.setDisliked(currentLikes + 1);
            responseRepository.save(res);
        }

        return res;
    }

    @Override
    public Response removeLike(Long responseId) {
        Response res = responseRepository.findById(responseId).orElse(null);

        if (res != null && res.getLiked() > 0) {
            Long currentLikes = res.getLiked();
            res.setLiked(currentLikes - 1);
            responseRepository.save(res);
        }

        return res;
    }

    @Override
    public Response removeDisLike(Long responseId) {
        Response res = responseRepository.findById(responseId).orElse(null);

        if (res != null && res.getDisliked() > 0) {

            Long currentLikes = res.getDisliked();
            res.setDisliked(currentLikes - 1);
            responseRepository.save(res);
        }

        return res;
    }

    @Override
    public void deleteResponseById(Long id) {
        responseRepository.deleteById(id);
    }

    @Override
    public void deleteAllResponse() {
        responseRepository.deleteAll();
    }
}
