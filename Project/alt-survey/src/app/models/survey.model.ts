export class Survey {
  private survey_id: Number;
  private surveyname: String;
  private survey_type: String;
  private message_subject: String;
  private message_body: String;
  private survey_dealy: Number;
  private createdBy: String;
  private createdDate: Date;
  private modifiedBy: String;
  private modifiedDate: Date;
  private active: Boolean;

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
