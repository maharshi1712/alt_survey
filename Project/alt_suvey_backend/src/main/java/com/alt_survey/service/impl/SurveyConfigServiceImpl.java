package com.alt_survey.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import com.alt_survey.model.SurveyConfig;
import com.alt_survey.model.User;
import com.alt_survey.repo.SurveyConfigRepository;
import com.alt_survey.repo.UserRepository;
import com.alt_survey.service.SurveyConfigService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyConfigServiceImpl implements SurveyConfigService{


    @Autowired
    private SurveyConfigRepository surveyConfigRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public SurveyConfig createSurvey(SurveyConfig surveyConfig) throws Exception {

        // SurveyConfig local = null;
        // local =
        // this.surveyRepository.findBySurveyName(surveyConfig.getSurvey_name());
        long id = surveyConfig.getUser().getId();

        surveyConfig.setCreatedBy(this.userRepository.findById(id).get().getFirstName());

        SurveyConfig surveyConfig2 = this.surveyConfigRepository.save(surveyConfig);
       surveyConfig2.setCreatedBy(this.userRepository.findById(id).get().getFirstName());
       surveyConfig2.setModifiedBy(this.userRepository.findById(id).get().getFirstName());

       this.surveyConfigRepository.save(surveyConfig2);



        // 

        // surveyConfig2.setCreatedBy(this.userRepository.findById(id).get().getFirstName());

        return surveyConfig2;
    }

    @Override
    public SurveyConfig addSurveyConfig(SurveyConfig surveyConfig) {
        // TODO Auto-generated method stub
        return this.surveyConfigRepository.save(surveyConfig);
    }

    @Override
    public SurveyConfig updateSurveyConfig(SurveyConfig surveyConfig , int survey_id) {
        // TODO Auto-generated method stub
        SurveyConfig value = null;

        if(surveyConfig.getSurvey_id()==survey_id)
        {
            surveyConfig.setsurveyname(surveyConfig.getsurveyname());
            surveyConfig.setSurvey_type(surveyConfig.getSurvey_type());
            surveyConfig.setMessage_subject(surveyConfig.getMessage_subject());
            surveyConfig.setMessage_body(surveyConfig.getMessage_body());
            surveyConfig.setSurvey_dealy(surveyConfig.getSurvey_dealy());
            //surveyConfig.setCreatedBy(surveyConfig.getCreatedBy());
            // surveyConfig.setModifiedBy(surveyConfig.getModifiedBy());

            long id = surveyConfig.getUser().getId();
            surveyConfig.setModifiedBy(this.userRepository.findById(id).get().getFirstName());

            surveyConfig.setActive(surveyConfig.isActive());

            value = this.surveyConfigRepository.save(surveyConfig);
        }

        return value;
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

    @Override
    public Set<SurveyConfig> getAllSurveyConfigByUser(User user) {
        // TODO Auto-generated method stub
        return new LinkedHashSet<>(this.surveyConfigRepository.findByUser(user));
    }
    
}
