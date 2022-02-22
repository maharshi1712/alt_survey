export class Survey {
  public survey_id: Number;
  public surveyname: String;
  public survey_type: String;
  public message_subject: String;
  public message_body: String;
  public survey_dealy: Number;
  public createdBy: String;
  public createdDate: Date;
  public modifiedBy: String;
  public modifiedDate: Date;
  public active: Boolean;

  constructor(
    survey_id: Number,
    surveyname: String,
    survey_type: String,
    message_subject: String,
    message_body: String,
    survey_dealy: Number,
    createdBy: String,
    createdDate: Date,
    modifiedBy: String,
    modifiedDate: Date,
    active: Boolean
  ) {
    this.survey_id = survey_id;
    this.surveyname = surveyname;
    this.survey_type = survey_type;
    this.message_subject = message_subject;
    this.message_body = message_body;
    this.survey_dealy = survey_dealy;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
    this.active = active;
  }
}
