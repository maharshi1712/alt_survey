package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public interface UserService {


    //Crating User;
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

//    //Get user by UserName;
//    public User getUser(String username);

    //Get user by Email
    //public User getUser(String email);


    //Delete user by id;
    public void deleteUser(Long userId);

    //update by user id;
    public User updateUser(User user,Long userId);

    public User findByEmail(String Email);


    public User loginUser(String email, String password);
}
