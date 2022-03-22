package com.alt_survey.service;

import java.util.Set;

import com.alt_survey.model.User;

import org.springframework.stereotype.Service;

@Service
public interface UserService {


    //Crating User;
    public User createUser(User user) throws Exception;




    //Delete user by id;
    public void deleteUser(Long userId);

    //update by user id;
    public User updateUser(User user,Long userId);

    // Get user by Email
    public User findByEmail(String Email);

    //Get all User
    public Set<User> getUsers();

    //get user by id;
    public User getUser(Long userId);


    public User loginUser(String email, String password);

    public void forgotPassword(String email, String password);
}
