package com.exam.repo;

import java.util.Set;

import com.exam.model.SurveyConfig;
import com.exam.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyConfigRepository  extends JpaRepository<SurveyConfig, Integer>{

    public SurveyConfig findBySurveyname(String SurveyName);

    public Set<SurveyConfig> findByUser(User user);


}
