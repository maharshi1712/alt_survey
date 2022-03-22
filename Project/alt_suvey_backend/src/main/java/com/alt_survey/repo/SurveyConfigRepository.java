package com.alt_survey.repo;

import java.util.Set;

import com.alt_survey.model.SurveyConfig;
import com.alt_survey.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyConfigRepository  extends JpaRepository<SurveyConfig, Integer>{

    public SurveyConfig findBySurveyname(String SurveyName);

    public Set<SurveyConfig> findByUser(User user);


}
