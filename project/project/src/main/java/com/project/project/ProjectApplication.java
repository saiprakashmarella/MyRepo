package com.project.project;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjectApplication {
	private static final Logger logg=LogManager.getLogger(ProjectApplication.class.getName());
	public static void main(String[] args) {

		SpringApplication.run(ProjectApplication.class, args);
		logg.info("Server Started");
	       
	}

}
