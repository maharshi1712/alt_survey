package com.exam.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class SurveyConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int survey_id;

    private String surveyname;

    private String survey_type;

    private String message_subject;

    private String message_body;

    private int survey_dealy;

    private boolean isActive;

    private String createdBy;

    private Date createdDate;

    private String modifiedBy;

    private Date modifiedDate;

    // @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "surveyConfig")
    // private Set<UserSurvey> userSurveys = new HashSet<>();

    public SurveyConfig() {
    }

    public SurveyConfig(int survey_id, String survery_name, String survey_type, String message_subject,
            String message_body, int survey_dealy, boolean isActive, String createdBy, Date createdDate,
            String modifiedBy, Date modifiedDate) {
        this.survey_id = survey_id;
        this.surveyname = survery_name;
        this.survey_type = survey_type;
        this.message_subject = message_subject;
        this.message_body = message_body;
        this.survey_dealy = survey_dealy;
        this.isActive = isActive;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.modifiedBy = modifiedBy;
        this.modifiedDate = modifiedDate;
    }

    public int getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(int survey_id) {
        this.survey_id = survey_id;
    }

    public String getsurveyname() {
        return surveyname;
    }

    public void setsurveyname(String surveyname) {
        this.surveyname = surveyname;
    }

    public String getSurvey_type() {
        return survey_type;
    }

    public void setSurvey_type(String survey_type) {
        this.survey_type = survey_type;
    }

    public String getMessage_subject() {
        return message_subject;
    }

    public void setMessage_subject(String message_subject) {
       this.message_subject = message_subject;
    }

    public String getMessage_body() {
        return message_body;
    }

    public void setMessage_body(String message_body) {
        this.message_body = message_body;
    }

    public int getSurvey_dealy() {
        return survey_dealy;
    }

    public void setSurvey_dealy(int survey_dealy) {
        this.survey_dealy = survey_dealy;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

}
