package com.project.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.project.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long>{
	
	@Query(value="select * from Customer where cust_Id=?1",nativeQuery=true)
	Customer findByCustId(Long id);
	
	@Query(value="select * from Customer where customer_Name=?1",nativeQuery=true)
	List<Customer> findByname(String name);
	
	@Query(value="select * from Customer c",nativeQuery=true)
	List<Customer> getAllCustomers();
	

}
