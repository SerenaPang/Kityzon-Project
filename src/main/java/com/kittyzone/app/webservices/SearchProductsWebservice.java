package com.kittyzone.app.webservices;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kittyzone.app.model.Product;

@RestController
public class SearchProductsWebservice {

	// curl -X GET "http://localhost:8080/searchByQuery?query=myproduct"
	@GetMapping("/searchByQuery")
	public ResponseEntity<List<Product>> searchByQuery(@RequestParam(value = "query", defaultValue = "nothing") String query) {
		System.out.println("SearchProductsWebservice.searchByQuery() " + query);
		List<Product> products = dummyProducts();

		return ResponseEntity.status(HttpStatus.OK).body(products);
	}

	/*
	 * Return dummy products.
	 */
	private List<Product> dummyProducts() {
		List<Product> products = new ArrayList<>();

		for (int i = 1; i < 11; i++) {
			Product product = new Product();
			product.setId(i);
			product.setName("Cat tree " + i);
			product.setBrand("XinTu " + i);
			product.setDescription("Cat tree for medium size cats " + i);
			product.setPrice(new BigDecimal(23.52));
			products.add(product);
		}

		return products;
	}
}
