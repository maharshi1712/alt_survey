package com.alt_survey.controller;

import java.util.Set;

import com.alt_survey.model.User;
import com.alt_survey.service.SendEmailService;
import com.alt_survey.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

        boolean flag = sendEmailService.sendEmail(email, "Please verify OTP for Registering on alt_survy By PeopleStrong", "One Time Password(OTP) for creating your new Registration on alt_suvey by peoplestrong: " + OTP);

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
            for (int i = 0; i < 4; i++) OTP += Integer.toString((int) (Math.random() * 10));

            boolean flag = sendEmailService.sendEmail(email, "Please verify OTP", "One Time Password(OTP) is : " + OTP);

            if (flag) return ResponseEntity.ok(OTP);

            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).build();
        }
    }

    //Creating user
    @PostMapping("/") //ye tb chalega jb /user/post ki request url me jayegi
    public ResponseEntity<User> createUser(@RequestBody User user) throws Exception {
        System.out.println("Posted");
        try {
            return ResponseEntity.ok(this.userService.createUser(user)); 
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).build();
        }
        
    }

    @PostMapping("/login")  //ye tb chalega jb /user/login post ki request url me jayega
    public ResponseEntity<User> loginUser(@RequestBody emailPasswordTemplate user) throws Exception{
        System.out.println("Logged In");
        try {
            
            return ResponseEntity.ok().body(this.userService.loginUser(user.getEmail(), user.getPassword()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody emailPasswordTemplate user){
       try {
           this.userService.forgotPassword(user.getEmail(), user.getPassword());
           return ResponseEntity.ok().build();
       } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
       }
        

        
    }


    //Fetching user by email
    @GetMapping("/{email}")
        public ResponseEntity<User> getUser(@PathVariable("email") String email){
       try {
           return ResponseEntity.ok(this.userService.findByEmail(email)); 
       } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
       }
    }

    @GetMapping("/")
    public ResponseEntity<Set<User>> getUsers(){

        try {
            return ResponseEntity.ok(this.userService.getUsers());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        
    }

    //Deleting the user by userId;
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);
    }

    //updating the user by userId;
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@RequestBody User user,@PathVariable("userId") Long userId)
    {
        try {
            return ResponseEntity.ok(this.userService.updateUser(user, userId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        
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