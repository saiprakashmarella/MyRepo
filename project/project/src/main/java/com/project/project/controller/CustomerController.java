package com.project.project.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.List;
import java.io.*;

import javax.activation.FileTypeMap;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.project.ProjectApplication;
import com.project.project.dao.CustomerDao;
import com.project.project.model.Customer;

import jdk.internal.org.jline.utils.Log;

@RestController
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	CustomerDao cd;
	private static final Logger logg=LogManager.getLogger(CustomerController.class.getName());
	@GetMapping("/customer")
	public ResponseEntity<List<Customer>> getCustomers(){
		try {
			logg.info("Getting All customer Details");
			return ResponseEntity.ok().body(cd.getAllCustomers());
		}catch(Exception e) {
			logg.error("Error while Fetching:"+e.toString());
			return ResponseEntity.notFound().build();
		}
	}
	@PostMapping("/addCustomer")
	public ResponseEntity<Customer> saveCustomer(@Valid @RequestBody Customer c){
		try {
			logg.info("Saving the details of customers");
			return ResponseEntity.ok().body(cd.save(c));
		}catch(Exception e) {
			logg.error("Error while saving the details"+e.toString());
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping("/customer/{name}")
	public ResponseEntity<List<Customer>> getCustomerByName(@PathVariable(value="name") String name){
		try {
			logg.info("fetching the details");
			
			return ResponseEntity.ok().body(cd.getCustByName(name));
		}catch(Exception e) {
			logg.error("error while getting details of customers with name:"+name+"-"+e.toString());
			return ResponseEntity.notFound().build();
		}
	}
	@PutMapping("/updateCustomerById/{id}")
	public String updateCustomerByname(@PathVariable(value="id") Long id, @Valid @RequestBody Customer c) {
		try {
			logg.info("Updating the customer with id"+id);
			String status=cd.UpdateCustomerById(id, c);
			if(status=="Successfully updated") {
				logg.info("Successfully updated");
				return "Success";
			}
			else {
				logg.info("Update failed");
				return "Failed";
			}
		}catch(Exception e) {
			logg.error("Updated failed:"+e.toString());
			return null;
		}
	}
	
	@GetMapping("/getImage")
	public ResponseEntity<byte[]>getImage() throws IOException {

		File file = new File("src/main/resources/customerProfilePhoto.png");
		
		return ResponseEntity.ok().contentType(MediaType.valueOf(FileTypeMap.getDefaultFileTypeMap().getContentType(file))).body(Files.readAllBytes(file.toPath()));
		
	}
}
