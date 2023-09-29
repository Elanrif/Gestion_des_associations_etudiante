package com.spring.assoetu.service;

import com.spring.assoetu.entity.Comment;
import com.spring.assoetu.entity.Response;

import java.util.List;

public interface ResponseService {

    public Response save(Long commentId,Long userReplyId,Response response) ;
    public Response update(Long commentId,Long userReplyId,Response response) ;
    public Response saveResponse(Response response) ;
    public List<Response> saveAllResponse(List<Response> responses) ;
    public Response updateResponse(Response response);
    public List<Response> updateAllResponse(List<Response> responses) ;
    public void deleteResponse(Response response);
    public Response addLike(Long responseId) ;
    public Response disLike(Long responseId) ;
    public Response removeLike(Long responseId) ;
    public Response removeDisLike(Long responseId) ;
    public void deleteResponseById(Long id) ;
    public void deleteAllResponse() ;

}
