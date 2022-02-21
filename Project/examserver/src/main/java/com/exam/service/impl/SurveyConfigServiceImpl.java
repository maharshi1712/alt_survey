package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import com.exam.model.SurveyConfig;
import com.exam.repo.SurveyConfigRepository;
import com.exam.service.SurveyConfigService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyConfigServiceImpl implements SurveyConfigService{


    @Autowired
    private SurveyConfigRepository surveyConfigRepository;

    @Override
    public SurveyConfig createSurvey(SurveyConfig surveyConfig) throws Exception {

        // SurveyConfig local = null;
        // local =
        // this.surveyRepository.findBySurveyName(surveyConfig.getSurvey_name());

        return this.surveyConfigRepository.save(surveyConfig);
    }

    @Override
    public SurveyConfig addSurveyConfig(SurveyConfig surveyConfig) {
        // TODO Auto-generated method stub
        return this.surveyConfigRepository.save(surveyConfig);
    }

    @Override
    public SurveyConfig updateSurveyConfig(SurveyConfig surveyConfig) {
        // TODO Auto-generated method stub
        return this.surveyConfigRepository.save(surveyConfig);
    }

    @Override
    public Set<SurveyConfig> getSurveyConfigs() {
        // TODO Auto-generated method stub
        return new LinkedHashSet<>(this.surveyConfigRepository.findAll());
    }

    @Override
    public SurveyConfig getSurveyConfig(int survey_id) {
        // TODO Auto-generated method stub
        return this.surveyConfigRepository.findById(survey_id).get();
    }

    @Override
    public void deleteSurveyConfig(int survey_id) {
        // TODO Auto-generated method stub
        SurveyConfig surveyConfig = new SurveyConfig();
        surveyConfig.setSurvey_id(survey_id);
        this.surveyConfigRepository.delete(surveyConfig);
        
    }
    
}
