package com.spring.assoetu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.assoetu.entity.UserInfo;
import com.spring.assoetu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserInfo userInfo){

        UserInfo auth = userService.login(userInfo) ;

        if(auth == null) {
            /* NOT_FOUND 404 */
            return new ResponseEntity("Veuillez vérifier vos informations", HttpStatus.NOT_FOUND) ;
        }
        return new ResponseEntity(auth, HttpStatus.OK)  ;
    }

    @PostMapping("/register")
    public UserInfo saveUser(@RequestBody UserInfo userInfo){

        return userService.saveUser(userInfo);
    }

    @PostMapping("/saveWithImg")
    public UserInfo saveWithImg(@RequestPart("user") String user,
                                @RequestPart(value = "image",required = false) MultipartFile image) throws JsonProcessingException {

        // Convertir la chaîne JSON en objet Association en utilisant Jackson, il ne prends pas en compte le type localDate
        ObjectMapper objectMapper = new ObjectMapper();
        UserInfo u = objectMapper.readValue(user, UserInfo.class);
        u.setRole("USER");
        return userService.saveUserWithImg(u,image);

    }

    @PutMapping("/updateWithImg")
    public UserInfo updateWithImg(@RequestPart("user") String user,
                                  @RequestPart(value = "image",required = false) MultipartFile image) throws JsonProcessingException {

        // Convertir la chaîne JSON en objet Association en utilisant Jackson, il ne prends pas en compte le type localDate
        ObjectMapper objectMapper = new ObjectMapper();
        UserInfo u = objectMapper.readValue(user, UserInfo.class);

        return userService.updateUserWithImg(u,image);

    }

    @RequestMapping(value="/saveAll",method = RequestMethod.POST)
    public List<UserInfo> saveUsers(@RequestBody List<UserInfo> userInfos){

        return userService.saveAllUser(userInfos) ;
    }

    @PostMapping("/update")
    public UserInfo updateUser(@RequestBody UserInfo userInfo){

        return userService.updateUser(userInfo);
    }

    @RequestMapping(value="/updateAll",method = RequestMethod.POST)
    public List<UserInfo> updateUsers(@RequestBody List<UserInfo> userInfos){

        return userService.updateAllUser(userInfos) ;
    }

    @GetMapping("/find/{id}")
    public UserInfo findUserById(@PathVariable Long id ) {

        return userService.findUserById(id) ;
    }

    @GetMapping("/find/all")
    public List<UserInfo> getAllUsers(){

        return userService.findAllUsers() ;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id){
        userService.deleteUserById(id);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestBody UserInfo userInfo){
        userService.deleteUser(userInfo);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        userService.deleteAllUser();
    }

    @GetMapping("/findByFirstNameContainingOrLastNameContaining")
    public List<UserInfo> findByFirstNameContainingOrLastNameContaining(@RequestParam("name") String value) {
        return userService.findByFirstNameContainingOrLastNameContaining(value,value);
    }

    @GetMapping("/findAllByOrderByFirstNameAsc")
    public List<UserInfo> findAllByOrderByFirstNameAsc() {
        return userService.findAllByOrderByFirstNameAsc();
    }

    @GetMapping("/findAllByOrderByFirstNameDesc")
    public List<UserInfo> findAllByOrderByFirstNameDesc() {
        return userService.findAllByOrderByFirstNameDesc();
    }

    @GetMapping("/findAllByOrderByLastNameAsc")
    public List<UserInfo> findAllByOrderByLastNameAsc() {
        return userService.findAllByOrderByLastNameAsc();
    }

    @GetMapping("/findAllByOrderByLastNameDesc")
    public List<UserInfo> findAllByOrderByLastNameDesc() {
        return userService.findAllByOrderByLastNameDesc();
    }

}
