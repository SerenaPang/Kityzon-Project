package com.kittyzone.app.repository;

import java.util.List;

import com.kittyzone.app.model.Product;

public interface ProductRepository {
    public List<Product> findBySearchString(String searchString);
}
