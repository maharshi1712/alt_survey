package com.exam.controller;

import java.util.Date;
import java.util.Set;

import com.exam.model.SurveyConfig;
import com.exam.model.User;
import com.exam.repo.SurveyConfigRepository;
import com.exam.repo.UserRepository;
import com.exam.service.SurveyConfigService;
import com.exam.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
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
        surveyConfig.setActive(true);
        return this.surveyConfigService.createSurvey(surveyConfig);
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

    @GetMapping("/user/{user_id}")
    public ResponseEntity<Set<SurveyConfig>> getAllJobsByCompany(@PathVariable("user_id") long user_id) {

        User user = this.userService.getUser(user_id);
        return ResponseEntity.ok(this.surveyConfigService.getAllSurveyConfigByUser(user));
    }

    //updating survey
    @PutMapping("/{survey_id}")
    public SurveyConfig updateSurveyConfig(@RequestBody SurveyConfig surveyConfig, @PathVariable("survey_id") int survey_id){
        surveyConfig.setModifiedDate(d1);
        surveyConfig.setCreatedBy(surveyConfig.getCreatedBy());
        return this.surveyConfigService.updateSurveyConfig(surveyConfig,survey_id);
    }

    //deleting survey
    @DeleteMapping("/{survey_id}")
    public void deleteSurveyConfig(@PathVariable("survey_id") int survey_id){
       
        this.surveyConfigService.deleteSurveyConfig(survey_id);
    }

}
