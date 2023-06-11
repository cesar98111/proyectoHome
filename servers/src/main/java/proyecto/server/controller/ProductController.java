package proyecto.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import proyecto.server.entity.Lists;
import proyecto.server.entity.Products;
import proyecto.server.service.ListService;
import proyecto.server.service.ProductsService;

@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	ListService listService;
	
	@Autowired
	ProductsService productsService;
	
	@PostMapping("/insert/{id}")
	public void productInList(@PathVariable(name="id") long id, @RequestBody Products product) {
		Lists list = listService.getListById(id);
		
		List<Products> productList = productsService.getProductsByList(list.getName());
		productList.add(product);
		Set<Products> products = new HashSet<Products>();
		for(int i= 0; i< productList.size(); i++) {
			
			productsService.productAdd(productList.get(i));
			System.out.print(productList.get(i));
			
			
			products.add(productList.get(i));
			
			list.setProducts(products);
			
			
		}
		listService.listAdd(list);
			
		
		
		
	}
	
	@GetMapping("/getByList/{name}")
	public List<Products> producByListName(@PathVariable(name="name") String name) {
		return productsService.getProductsByList(name);
	}
	

}
