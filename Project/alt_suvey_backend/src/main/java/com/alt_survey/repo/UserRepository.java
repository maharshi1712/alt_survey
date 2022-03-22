package com.alt_survey.repo;

import com.alt_survey.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

//    public User findByUsername(String username);
    public User findByEmail(String Email);

}
