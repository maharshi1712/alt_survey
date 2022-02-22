package com.exam.controller;

import java.util.Date;

import com.exam.model.SurveyConfig;
import com.exam.model.User;
import com.exam.repo.SurveyConfigRepository;
import com.exam.repo.UserRepository;
import com.exam.service.SurveyConfigService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/surveyConfig")
@CrossOrigin("*")
public class SurveyConfigController {

    Date d1 = new Date();

    // @Autowired
    // private SurveyConfig surveyConfig1;

    SurveyConfig surveyConfig1 = new SurveyConfig();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SurveyConfigRepository surveyConfigRepository;

    @Autowired
    private SurveyConfigService surveyConfigService;

    //Adding Survey
    @PostMapping("/")
    public SurveyConfig addSurveyConfig(@RequestBody SurveyConfig surveyConfig) throws Exception
    {
        surveyConfig.setCreatedDate(d1);
        surveyConfig.setModifiedDate(d1);
        
       
        SurveyConfig s1 = this.surveyConfigService.createSurvey(surveyConfig);
        for (User user : surveyConfig1.getUserList()) {
            user.getSurveyConfigsList().add(s1);
            this.userRepository.save(user);
            s1.getUserList().add(user);
            this.surveyConfigRepository.save(s1);
        }
        return s1;
    }

    //Getting survey by Id
    @GetMapping("/{survey_id}")
    public SurveyConfig getSurveyConfig(@PathVariable("survey_id") int survey_id){
        return this.surveyConfigService.getSurveyConfig(survey_id);
    }

    //Getting all survey

    @GetMapping("/")
    public ResponseEntity<?>getSurveyConfigs(){
        return ResponseEntity.ok(this.surveyConfigService.getSurveyConfigs());
    }

    //updating survey
    @PutMapping("/{survey_id}")
    public SurveyConfig updateSurveyConfig(@RequestBody SurveyConfig surveyConfig, @PathVariable("survey_id") int survey_id){
        surveyConfig.setModifiedDate(d1);
        return this.surveyConfigService.updateSurveyConfig(surveyConfig,survey_id);
    }

    //deleting survey
    @DeleteMapping("/{survey_id}")
    public void deleteSurveyConfig(@PathVariable("survey_id") int survey_id){
       
        this.surveyConfigService.deleteSurveyConfig(survey_id);
    }

}
