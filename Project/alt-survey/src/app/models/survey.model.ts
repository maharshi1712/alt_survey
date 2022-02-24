export class SurveyModel {
  public survey_id: Number = 0;
  public surveyname: String = '';
  public survey_type: String = '';
  public message_subject: String = '';
  public message_body: String = '';
  public survey_dealy: Number = 0;
  public created_by: any;
  public created_date:Date = new Date();
  public modified_by: any;
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
    this.created_by = response.createdBy;
    this.modified_by = response.modifiedBy;
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
    this.created_by = response.createdBy;
    this.created_date = response.createdDate;
    this.modified_by = localStorage.getItem('first_name');
    this.user.id = localStorage.getItem('user_id');
  }
}
