package com.kittyzone.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kittyzone.app.model.Product;
import com.kittyzone.app.repository.ProductRepository;

@Service
public class ProductsService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> searchBySearchString(String searchString) {
        System.out.println("ProductsService.searchBySearchString() " + searchString);

        return productRepository.findBySearchString(searchString);
    }
}
