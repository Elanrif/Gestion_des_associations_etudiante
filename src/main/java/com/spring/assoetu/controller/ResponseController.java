package com.spring.assoetu.controller;

import com.spring.assoetu.entity.Comment;
import com.spring.assoetu.entity.Response;
import com.spring.assoetu.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/respond")
public class ResponseController {

    @Autowired
    private ResponseService responseService ;

    @PostMapping("/save")
    public Response save(@RequestParam("commentId") Long commentId,
                         @RequestParam("userId") Long userReplyId,@RequestBody Response response) {

        return responseService.save(commentId,userReplyId,response);
    }

    @PutMapping("/update")
    public Response update(@RequestParam("commentId") Long commentId,
                         @RequestParam("userId") Long userReplyId,@RequestBody Response response) {

        return responseService.update(commentId,userReplyId,response);
    }

    public Response saveResponse(Response response) {
        return null;
    }

    public List<Response> saveAllResponse(List<Response> responses) {
        return null;
    }

    public Response updateResponse(Response response) {
        return null;
    }

    public List<Response> updateAllResponse(List<Response> responses) {
        return null;
    }

    @DeleteMapping("/delete")
    public void deleteResponse(@RequestBody Response response) {

        responseService.deleteResponse(response);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteResponseById(@PathVariable("id") Long id) {

        responseService.deleteResponseById(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllResponse() {

        responseService.deleteAllResponse();
    }

    @GetMapping("/like/{id}")
    public Response addLike(@PathVariable Long id) {
        return responseService.addLike(id);
    }
    @GetMapping("/dislike/{id}")
    public Response disLike(@PathVariable Long id) {
        return responseService.addLike(id);
    }

    @GetMapping("/removeLike/{id}")
    public Response removeLike(@PathVariable("id") Long id) {
        return responseService.removeLike(id);
    }

    @GetMapping("/removeDisLike/{id}")
    public Response removeDisLike(@PathVariable("id") Long id) {
        return responseService.removeDisLike(id);
    }
}
