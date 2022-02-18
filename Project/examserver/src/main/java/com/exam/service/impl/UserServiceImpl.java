package com.exam.service.impl;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    //creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception{

       //User local =  this.userRepository.findByUsername(user.getUsername());
        User local = this.userRepository.findByEmail(user.getEmail());

       if(local!=null)
       {
           System.out.println("user is already there");
           throw new Exception("user already present");
       }
       else{
           //User create
           for (UserRole ur:userRoles){
               roleRepository.save(ur.getRole());
           }
            user.getUserRoles().addAll(userRoles);
          local =  this.userRepository.save(user);
       }
       return local;


    }



//    @Override
//    public User getUser(String username) {
//        return this.userRepository.findByUsername(username);
//    }

//    @Override
//    public User getUser(String email) {
//        return this.userRepository.findByEmail(email);
//    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(User user,Long userId) {
        User local= null;
        if(user.getId()==userId)
        {
            //user.setUsername(user.getUsername());
            user.setPassword(user.getPassword());
            user.setFirstName(user.getFirstName());
            user.setLastName(user.getLastName());
            user.setEmail(user.getEmail());
//            user.setPhone(user.getPhone());
//            user.setProfile(user.getProfile());
            local = this.userRepository.save(user);

        }
        return local;
    }

    @Override
    public User findByEmail(String Email){
        return this.userRepository.findByEmail(Email);
    }

    @Override
    public User loginUser(String email, String password) {

        User user = this.userRepository.findByEmail(email);
        if(user == null) return null;

        if(password.equals(user.getPassword())) {
            return user;
        }

        return null;
    }
}
