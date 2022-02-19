package com.exam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

   // private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
   // private String phone;
    private boolean enabled = true;
//    private String profile;


//Single user may have many roles;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "users")
    @JsonIgnore
    private Set<UserRole> userRoles = new HashSet<>();


    public User(Long id, String password, String firstName, String lastName, String email,  boolean enabled, Set<UserRole> userRoles) {
        this.id = id;
        //this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
       // this.phone = phone;
        this.enabled = enabled;
       // this.profile = profile;
        this.userRoles = userRoles;
    }

    public User() {
        super();
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    //public String getUsername() {
//        return username;
//    }

//   // public void setUsername(String username) {
//        this.username = username;
//    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

//    public String getProfile() {
//        return profile;
//    }

//    public void setProfile(String profile) {
//        this.profile = profile;
//    }
}
