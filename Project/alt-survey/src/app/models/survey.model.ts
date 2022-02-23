export class SurveyModel {
  public survey_id: Number = 0;
  public surveyname: String = '';
  public survey_type: String = '';
  public message_subject: String = '';
  public message_body: String = '';
  public survey_dealy: Number = 0;
  public createdBy: String = '';
  public modifiedBy: any;
  public active: Boolean = false;
  public user: any = {
    id: 1,
  };

  setValues(response: any) {
    this.survey_id = response.survey_id;
    this.surveyname = response.surveyname;
    this.survey_type = response.survey_type;
    this.message_subject = response.message_subject;
    this.message_body = response.message_body;
    this.survey_dealy = response.survey_dealy;
    this.active = response.active;
    this.modifiedBy = localStorage.getItem('first_name');
    this.user.id = localStorage.getItem('user_id');
  }
}
