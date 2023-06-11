package proyecto.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto.server.entity.Products;
import proyecto.server.repository.ProductsRepository;

@Service
public class ProductsService {
	
	@Autowired
	ProductsRepository productRepository;
	
	public Products productAdd(Products newProduct) {
		return productRepository.save(newProduct);
	}
	
	public List<Products> getProductsByList(String name){
		return productRepository.findByListName(name);
	}
	
}
