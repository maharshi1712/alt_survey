package com.exam;

import java.util.Date;

import com.exam.model.SurveyConfig;
import com.exam.model.User;
import com.exam.repo.UserRepository;
import com.exam.service.SurveyConfigService;
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
	private SurveyConfigService surveyConfigService;

	@Autowired
	private UserRepository userRepository;




	@Override
	public void run(String... args) throws Exception {

		System.out.println("Strating code..");

		// User user = new User();

		// user.setFirstName("Rahul");
		// user.setLastName("Jaiswal");
		// user.setPassword("123456");
		// user.setEmail("rahulvdjaiswal@gmail.com");


		// User user1 = this.userService.createUser(user);
		// System.out.println(user1.getEmail());


		// User user2 = new User();

		// user2.setFirstName("Shivam");
		// user2.setLastName("Prakash");
		// user2.setPassword("12345");
		// user2.setEmail("shivamprakash@gmail.com");

		// User user3 = this.userService.createUser(user2);
		// System.out.println(user3.getEmail());


		// Date d1 = new Date();
		// SurveyConfig surveyConfig = new SurveyConfig();
		// surveyConfig.setsurveyname("Resignation Survey");
		// surveyConfig.setSurvey_type("Resignation");
		// surveyConfig.setSurvey_dealy(100);
		// surveyConfig.setMessage_subject("Message Subject");
		// surveyConfig.setMessage_body("This is message body");
		// surveyConfig.setCreatedBy("Rahul");
		// surveyConfig.setActive(true);
		// surveyConfig.setCreatedDate(d1);
		// surveyConfig.setModifiedBy("Pushkar");
		// surveyConfig.setModifiedDate(d1);

		// SurveyConfig s = this.surveyConfigService.createSurvey(surveyConfig);
		// System.out.println(s.getsurveyname());


		// SurveyConfig surveyConfig1 = new SurveyConfig();
		// surveyConfig1.setsurveyname("Email Survey");
		// surveyConfig1.setSurvey_type("Onboarding");
		// surveyConfig1.setSurvey_dealy(100);
		// surveyConfig1.setMessage_subject("Message Subject");
		// surveyConfig1.setMessage_body("This is message body");
		// surveyConfig1.setCreatedBy("Rahul");
		// surveyConfig1.setActive(true);
		// surveyConfig1.setCreatedDate(d1);
		// surveyConfig1.setModifiedBy("Shivam");
		// surveyConfig1.setModifiedDate(d1);


		
		// SurveyConfig s1 = this.surveyConfigService.createSurvey(surveyConfig1);
		// System.out.println(s1.getsurveyname());



		// user.getSurveyConfigsList().add(surveyConfig);
		// user.getSurveyConfigsList().add(surveyConfig1);

		// surveyConfig.getUserList().add(user);
		// surveyConfig1.getUserList().add(user);

		// user2.getSurveyConfigsList().add(surveyConfig);
		// user2.getSurveyConfigsList().add(surveyConfig1);


		// surveyConfig.getUserList().add(user2);
		// surveyConfig1.getUserList().add(user2);

		// this.userRepository.save(user);
		// this.userRepository.save(user2);
		


	}
}
