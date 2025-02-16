package com.kittyzone.app.repository.postgresql;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.kittyzone.app.model.Product;
import com.kittyzone.app.repository.ProductRepository;

@Repository
public class ProductRepositoryImpl implements ProductRepository {

    // TODO: Add connection to postgresql.
    @Override
    public List<Product> findBySearchString(String searchString) {
        System.out.println("ProductRepositoryImpl.findBySearchString() " + searchString);
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
