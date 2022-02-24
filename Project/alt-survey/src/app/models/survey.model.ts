export class SurveyModel {
  public survey_id: Number = 0;
  public surveyname: String = '';
  public survey_type: String = '';
  public message_subject: String = '';
  public message_body: String = '';
  public survey_dealy: Number = 0;
  public createdBy: any;
  public createdDate:Date = new Date();
  public modifiedBy: any;
  public active: Boolean = false;
  public user: any = {
    id: 1,
  };

  setValuesView(response: any) {
    this.survey_id = response.survey_id;
    this.surveyname = response.surveyname;
    this.survey_type = response.survey_type;
    this.message_subject = response.message_subject;
    this.message_body = response.message_body;
    this.survey_dealy = response.survey_dealy;
    this.active = response.active;
    this.createdBy = response.createdBy;
    this.modifiedBy = response.modifiedBy;
    this.user.id = localStorage.getItem('user_id');
  }
  setValuesEdit(response: any) {
    this.survey_id = response.survey_id;
    this.surveyname = response.surveyname;
    this.survey_type = response.survey_type;
    this.message_subject = response.message_subject;
    this.message_body = response.message_body;
    this.survey_dealy = response.survey_dealy;
    this.active = response.active;
    this.createdBy = response.createdBy;
    this.createdDate = response.createdDate;
    this.modifiedBy = localStorage.getItem('first_name');
    this.user.id = localStorage.getItem('user_id');
  }
}
