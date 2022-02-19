package com.exam.model;

import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;

@Entity
public class UserRole
{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private  long userId;

    //User
    @ManyToOne(fetch = FetchType.EAGER)
    private  User users;

    @ManyToOne
    private  Role role;

    public UserRole() {
    }

    public UserRole(long userId, User user, Role role) {
        this.userId = userId;
        this.users = user;
        this.role = role;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public User getUser() {
        return users;
    }

    public void setUser(User user) {
        this.users = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
