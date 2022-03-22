package com.alt_survey.controller;

import java.util.Date;
import java.util.Set;

import com.alt_survey.model.SurveyConfig;
import com.alt_survey.model.User;
import com.alt_survey.service.SurveyConfigService;
import com.alt_survey.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/surveyConfig")
@CrossOrigin("*")
public class SurveyConfigController {

    Date d1 = new Date();

    // @Autowired
    // private SurveyConfig surveyConfig1;

    SurveyConfig surveyConfig1 = new SurveyConfig();

    @Autowired
    private UserService userService;

    @Autowired
    private SurveyConfigService surveyConfigService;

    //Adding Survey
    @PostMapping("/")
    public SurveyConfig addSurveyConfig(@RequestBody SurveyConfig surveyConfig) throws Exception
    {
        surveyConfig.setCreatedDate(d1);
        surveyConfig.setModifiedDate(d1);
        surveyConfig.setActive(true);
        return this.surveyConfigService.createSurvey(surveyConfig);
    }

    //Getting survey by Id
    @GetMapping("/{survey_id}")
    public ResponseEntity<SurveyConfig> getSurveyConfig(@PathVariable("survey_id") int survey_id){
        try {
            return ResponseEntity.ok(this.surveyConfigService.getSurveyConfig(survey_id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
    }

    //Getting all survey
    @GetMapping("/")
    public ResponseEntity<?>getSurveyConfigs(){
        try {
            return ResponseEntity.ok(this.surveyConfigService.getSurveyConfigs());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<Set<SurveyConfig>> getAllSurveyByUser(@PathVariable("user_id") long user_id) {

        User user = this.userService.getUser(user_id);
        try {
            return ResponseEntity.ok(this.surveyConfigService.getAllSurveyConfigByUser(user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
    }

    //updating survey
    @PutMapping("/{survey_id}")
    public ResponseEntity<SurveyConfig> updateSurveyConfig(@RequestBody SurveyConfig surveyConfig, @PathVariable("survey_id") int survey_id){
        surveyConfig.setModifiedDate(d1);
        surveyConfig.setCreatedBy(surveyConfig.getCreatedBy());
        try {
            return ResponseEntity.ok(this.surveyConfigService.updateSurveyConfig(surveyConfig, survey_id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        
    }

    //deleting survey
    @DeleteMapping("/{survey_id}")
    public ResponseEntity<?> deleteSurveyConfig(@PathVariable("survey_id") int survey_id){
       
        try {
            this.surveyConfigService.deleteSurveyConfig(survey_id);
           return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        
    }

}
