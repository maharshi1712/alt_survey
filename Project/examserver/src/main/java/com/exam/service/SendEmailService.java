package com.exam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailParseException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public boolean sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rahulvdjaiswal@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        try {
            javaMailSender.send(message);
            return true;
        }
        catch(MailParseException e) {
            e.printStackTrace();
        }
        catch(MailAuthenticationException e) {
            e.printStackTrace();
        }
        catch(MailSendException e) {
            e.printStackTrace();
        }
        catch(MailException e) {
            e.printStackTrace();
        }
        return false;
    }

}