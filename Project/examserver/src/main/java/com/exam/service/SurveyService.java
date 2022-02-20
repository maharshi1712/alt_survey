package com.exam.service;

import com.exam.model.SurveyConfig;

import org.springframework.stereotype.Service;

@Service
public interface SurveyService {

    public SurveyConfig createSurvey(SurveyConfig surveyConfig) throws Exception;


    
}
