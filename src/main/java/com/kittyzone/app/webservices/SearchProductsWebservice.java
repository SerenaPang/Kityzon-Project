package com.kittyzone.app.webservices;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kittyzone.app.model.Product;
import com.kittyzone.app.service.ProductsService;

@RestController
public class SearchProductsWebservice {

	@Autowired
	private ProductsService productService;

	// curl -X GET "http://localhost:8080/searchByQuery?query=myproduct"
	@GetMapping("/searchByQuery")
	public ResponseEntity<List<Product>> searchByQuery(@RequestParam(value = "query", defaultValue = "nothing") String query) {
		System.out.println("SearchProductsWebservice.searchByQuery() " + query);
		List<Product> products = productService.searchBySearchString(query);

		return ResponseEntity.status(HttpStatus.OK).body(products);
	}
}
