package com.project.project.model;

import java.io.File;
import java.nio.file.Path;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name="Customer")
@EntityListeners(AuditingEntityListener.class)
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long cust_Id;
	@NotBlank
	private String customer_Name;
	@NotBlank
	private String cust_Country;
	private int age;
	@NotBlank
	private String cust_Address;
	private String img_path="";
	public Long getCustId() {
		return cust_Id;
	}
	public void setCustId(Long custId) {
		this.cust_Id = custId;
	}
	public String getCustomerName() {
		return customer_Name;
	}
	public void setCustomerName(String customerName) {
		this.customer_Name = customerName;
	}
	public String getCustCountry() {
		return cust_Country;
	}
	public void setCustCountry(String custCountry) {
		this.cust_Country = custCountry;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getCustAddress() {
		return cust_Address;
	}
	public void setCustAddress(String custAddress) {
		this.cust_Address = custAddress;
	}
	public String getImg_path() {
		return img_path;
	}
	public void setImg_path(String img_path) {
		this.img_path = img_path;
	}
	
	
	

}
