package com.project.project.features;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.project.controller.CustomerController;
@Component
public class EmailFunctionality {
	@Autowired
	JavaMailSender jms;
	
//	@Autowired
//	SimpleMailMessage preConfiguredMessage;
//	
	private static final Logger logg=LogManager.getLogger(EmailFunctionality.class.getName());
	public String sendEmail() throws AddressException,MessagingException,IOException,NullPointerException{
//		try 
//		{
//			logg.info("Sending the email");
//			SimpleMailMessage message = new SimpleMailMessage();
//	        message.setTo("saiprakashmarella3277@gmail.com");
//	        message.setSubject("Testing from springboot");
//	        message.setText("Hello from SpringBoot");
//	        jms.send(message);
//	        
//	        logg.info("Mail Sent successfully");
//	        return "Success";
//		}catch(Exception e) {
//			logg.error("Mail was not sent due to :"+e.toString());
//			return "Failed";
//		}
//	}
		 MimeMessagePreparator preparator = new MimeMessagePreparator() 
		    {
		        public void prepare(MimeMessage mimeMessage) throws Exception 
		        {
		        	logg.info("Sending Email");
		            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress("saiprakashmarella3277@gmail.com"));
		            mimeMessage.setFrom(new InternetAddress("admin@gmail.com"));
		            mimeMessage.setSubject("SpringbootTest");
		             
		            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		             
		            helper.setText("<html><body><img src='cid:identifier1234'></body></html>", true);
		             
		            File file = new File("src/main/resources/customerProfilePhoto.png");
		            helper.addAttachment("customerPhoto", file);
		            logg.info("Added attachment if there is any");
		            File res = new File("src/main/resources/customerProfilePhoto.png");
		            helper.addInline("identifier1234", res);
		        }
		    };
		     
		    try {
		        jms.send(preparator);
		        return "Success";
		    }
		    catch (MailException ex) {
		        // simply log it and go on...
		    	logg.error(ex.getMessage());
		        return ex.toString();
		    }
}
}
