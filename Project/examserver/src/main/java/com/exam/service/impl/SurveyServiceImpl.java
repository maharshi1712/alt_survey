package com.exam.service.impl;

import com.exam.model.SurveyConfig;
import com.exam.repo.SurveyRepository;
import com.exam.service.SurveyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyServiceImpl implements SurveyService {


    @Autowired
    private SurveyRepository surveyRepository;

    @Override
    public SurveyConfig createSurvey(SurveyConfig surveyConfig) throws Exception {
        
        // SurveyConfig local = null;
        // local = this.surveyRepository.findBySurveyName(surveyConfig.getSurvey_name());

        return this.surveyRepository.save(surveyConfig);
    }
    
}
