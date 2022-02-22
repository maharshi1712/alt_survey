package com.exam.repo;

import com.exam.model.SurveyConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyConfigRepository  extends JpaRepository<SurveyConfig, Integer>{

    public SurveyConfig findBySurveyname(String SurveyName);


}
