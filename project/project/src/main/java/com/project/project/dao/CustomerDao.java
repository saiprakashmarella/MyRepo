package com.project.project.dao;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.project.ProjectApplication;
import com.project.project.model.Customer;
import com.project.project.repository.CustomerRepository;

@Service
public class CustomerDao {
	@Autowired
	CustomerRepository cr;
	
	/*  To save customer*/
	private static final Logger logg=LogManager.getLogger(CustomerDao.class.getName());
	public Customer save(Customer cu) {
		try {
			logg.info("Saving the details");
		return cr.save(cu);
		
	}catch(Exception e) {
		logg.error("error while saving-"+e.toString());
		return null;
	}
	}
	
	
	/* To Delete customer */
	
	public String deleteById(Long id) {
		try {
			logg.info("deleting the user with id:"+id);
			cr.deleteById(id);
			return "Successfully deleted the customer with ID:"+id;
		}
		catch(Exception e) {
			logg.error("Error while deleting"+e.toString());
			return "Failed to delete:"+e;
		}
	}
	
	/* To search customer */
	public Customer findById(Long id){
		try {
			logg.info("Fetching the details of user with id:"+id);
			return cr.findByCustId(id);
		}
		catch(Exception e) {
			logg.error("Error while fetching:"+e.toString());
			return null;
		}
	}
	
	/* To update customer */
	public String UpdateCustomerById(Long id,Customer cu) {
		try {
			
		Customer c=(Customer)this.findById(id);
		logg.info("got the existing details of the user:"+id);
		
		c.setAge(cu.getAge());
		c.setCustId(id);
		c.setCustAddress(cu.getCustAddress());
		c.setCustCountry(cu.getCustCountry());
		c.setCustomerName(cu.getCustomerName());
		logg.info("Updating the user");
		if(this.deleteById(id).contains("Success")) {
			this.save(c);
			logg.info("update successfull");
			return "Successfully updated";
		}
		else {
			logg.error("update failed");
			throw new Exception("Failed to get the details");
		}
	}
		catch(Exception e) {
			logg.error("update failed:"+e.toString());
			return e.toString();
		}
	}
	
	/* get Customers by Name */
	public List<Customer> getCustByName(String name){
		try {
			logg.info("fetching the details with name:"+name);
			if(cr.findByname(name).size()>0) {
				logg.info("Fetched the details with name:"+name);
				return cr.findByname(name);
			}
			else {
				logg.info("No details found with name"+name);
				return null;
			}
		}catch(Exception e) {
			
			logg.error("Error while getting data with name-"+name+":"+e.toString());
			return null;
		}
	}
	
	/* get All Customers */
	public List<Customer> getAllCustomers(){
		try {
			logg.info("fetching All customers details");
			if(cr.getAllCustomers().size()>0) {
				logg.info("successfully fetched the data");
				return cr.getAllCustomers();
			}
			else {
				logg.info("No data available");
				return null;
			}
		}catch(Exception e) {
			logg.error("No data found"+e.toString());
			return null;
		}
	}
}