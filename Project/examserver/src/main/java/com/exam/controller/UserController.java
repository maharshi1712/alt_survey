package com.exam.controller;


import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.SendEmailService;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    //
    @Autowired
    private UserService userService;

    @Autowired
    private SendEmailService sendEmailService;

    @GetMapping("/signup/sendotp/{email}")
    public ResponseEntity<String>sendSignUpOTP(@PathVariable("email") String email) {
        /*
         * If User is not present with given emailId, this method will return OTP with status code 200.
         * If User is already present with given emailId, this method will return null with status code 208 (Already reported).
         */


        // Check if user is already present with given emailId.
        User user = this.userService.findByEmail(email);
        if(user != null) return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).build();


        String OTP = "";
        // Generating 4 digits OTP
        for(int i=0; i<6; i++) OTP += Integer.toString((int) (Math.random() * 10));

        boolean flag = sendEmailService.sendEmail(email, "Please verify OTP", "One Time Password(OTP) is : " + OTP);

        if(flag) return ResponseEntity.ok(OTP);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }


    //SENDING OTP FOR FORGOT-PASSWORD

    @GetMapping("/forgot-password/sendotp/{email}")
    public ResponseEntity<String> sendForgotPasswordOTP(@PathVariable("email") String email) {
        /*
         * If User is already present with given emailId If User is not present with given emailId, this method will return OTP with status code 200.
         * If User is not present with given emailId , this method will return null with status code 500 (Not Present).
         */


        // Check if user is not present with given emailId.
        User user = this.userService.findByEmail(email);
        if(user == null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();


        else {
            String OTP = "";
            // Generating 4 digits OTP
            for (int i = 0; i < 6; i++) OTP += Integer.toString((int) (Math.random() * 10));

            boolean flag = sendEmailService.sendEmail(email, "Please verify OTP", "One Time Password(OTP) is : " + OTP);

            if (flag) return ResponseEntity.ok(OTP);

            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).build();
        }
    }

    //Creating user
    @PostMapping("/") //ye tb chalega jb /user/post ki request url me jayegi
    public User createUser(@RequestBody User user) throws Exception {

        System.out.println("Posted");
        //We are not setting profile through web
        //user.setProfile("default.png");
        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("Normal");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        return this.userService.createUser(user, roles);
    }

    @PostMapping("/login")  //ye jb chalega jb /user/login post ki request url me jayega
    public User loginUser(@RequestBody emailPasswordTemplate user) throws Exception{
        System.out.println("Logged In");
        return this.userService.loginUser(user.getEmail(), user.getPassword());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody emailPasswordTemplate user){
//        System.out.println("Forgot password " + user.getEmail() +"\t"+user.getPassword() );
        this.userService.forgotPassword(user.getEmail(), user.getPassword());

        return ResponseEntity.ok().build();
    }

    //Fetching the user by userName;
//    @GetMapping("/{username}")
//    public User getUser(@PathVariable("username") String username){
//        return this.userService.getUser(username);
//    }

    //Fetching user by email
    @GetMapping("/{email}")
        public User getUser(@PathVariable("email") String email){
       return this.userService.findByEmail(email);
    }

    //Deleting the user by userId;
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);
    }

    //updating the user by userId;
    @PutMapping("/{userId}")
    public User updateUser(@RequestBody User user,@PathVariable("userId") Long userId)
    {
        return this.userService.updateUser(user,userId);
    }

}


class emailPasswordTemplate {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}