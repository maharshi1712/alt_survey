package com.exam;

import java.util.Date;

import com.exam.model.SurveyConfig;
import com.exam.model.User;
import com.exam.service.SurveyService;
import com.exam.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Autowired
	private UserService userService;

	@Autowired
	private SurveyService surveyService;


	@Override
	public void run(String... args) throws Exception {

		System.out.println("Strating code..");

		User user = new User();

		user.setFirstName("Rahul");
		user.setLastName("Jaiswal");
		user.setPassword("123456");
		user.setEmail("rahulvdjaiswal@gmail.com");


		User user1 = this.userService.createUser(user);
		System.out.println(user1.getEmail());


		Date d1 = new Date();
		SurveyConfig surveyConfig = new SurveyConfig();
		surveyConfig.setsurveyname("Email Survey");
		surveyConfig.setSurvey_type("Onboarding");
		surveyConfig.setSurvey_dealy(100);
		surveyConfig.setMessage_subject("Message Subject");
		surveyConfig.setMessage_body("This is message body");
		surveyConfig.setCreatedBy("Rahul");
		surveyConfig.setActive(true);
		surveyConfig.setCreatedDate(d1);
		surveyConfig.setModifiedBy("Shivam");
		surveyConfig.setModifiedDate(d1);

		//SurveyConfig surveyConfig2 = this.surveyService.createSurvey(surveyConfig);

		// // Set<SurveyConfig> surveyConfigsSet = new HashSet<>();
		// // UserSurvey userSurvey = new UserSurvey();
		// // userSurvey.setSurveyConfig(surveyConfig);
		// // userSurvey.setUser(user);

		// // surveyConfigsSet.add(surveyConfig);

		SurveyConfig s = this.surveyService.createSurvey(surveyConfig);

		System.out.println(s.getsurveyname());

	}
}
