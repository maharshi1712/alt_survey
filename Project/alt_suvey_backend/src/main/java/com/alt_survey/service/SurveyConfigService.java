package com.alt_survey.service;

import java.util.Set;

import com.alt_survey.model.SurveyConfig;
import com.alt_survey.model.User;

import org.springframework.stereotype.Service;

@Service
public interface SurveyConfigService  {

    public SurveyConfig createSurvey(SurveyConfig surveyConfig) throws Exception;

    public SurveyConfig addSurveyConfig(SurveyConfig surveyConfig);

    public SurveyConfig updateSurveyConfig(SurveyConfig surveyConfig, int survey_id);

    public Set<SurveyConfig> getSurveyConfigs();

    public SurveyConfig getSurveyConfig(int survey_id);

    public void deleteSurveyConfig(int survey_id);

    public Set<SurveyConfig> getAllSurveyConfigByUser(User user);

    
}
