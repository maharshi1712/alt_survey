package com.exam.controller;

import com.exam.model.SurveyConfig;
import com.exam.service.SurveyConfigService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
public class SurveyConfigController {

    @Autowired
    private SurveyConfigService surveyConfigService;

    //Adding Survey
    @PostMapping("/")
    public SurveyConfig addSurveyConfig(@RequestBody SurveyConfig surveyConfig) throws Exception
    {
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

    //updating survey
    @PutMapping("/")
    public SurveyConfig updateSurveyConfig(@RequestBody SurveyConfig surveyConfig){
        return this.surveyConfigService.updateSurveyConfig(surveyConfig);
    }

    //deleting survey
    @DeleteMapping("/{survey_id}")
    public void deleteSurveyConfig(@PathVariable("survey_id") int survey_id){
       
        this.surveyConfigService.deleteSurveyConfig(survey_id);
    }

}
