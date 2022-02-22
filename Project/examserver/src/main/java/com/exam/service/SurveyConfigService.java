package com.exam.service;

import java.util.Set;

import com.exam.model.SurveyConfig;

import org.springframework.stereotype.Service;

@Service
public interface SurveyConfigService  {

    public SurveyConfig createSurvey(SurveyConfig surveyConfig) throws Exception;

    public SurveyConfig addSurveyConfig(SurveyConfig surveyConfig);

    public SurveyConfig updateSurveyConfig(SurveyConfig surveyConfig, int survey_id);

    public Set<SurveyConfig> getSurveyConfigs();

    public SurveyConfig getSurveyConfig(int survey_id);

    public void deleteSurveyConfig(int survey_id);

    
}
