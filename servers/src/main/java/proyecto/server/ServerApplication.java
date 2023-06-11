package proyecto.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import proyecto.server.entity.Users;
import proyecto.server.repository.ProductsRepository;
import proyecto.server.service.GroupsService;
import proyecto.server.service.ListService;
import proyecto.server.service.ProductsService;
import proyecto.server.service.TaskService;
import proyecto.server.service.UserService;
import proyecto.server.entity.Group;
import proyecto.server.entity.Tasks;
import proyecto.server.entity.Lists;
import proyecto.server.entity.Products;

import java.util.Set;
import java.util.Calendar;
import java.util.HashSet;
@SpringBootApplication
public class ServerApplication implements CommandLineRunner  {
	
	@Autowired 
	UserService userService;
	
	@Autowired
	GroupsService groupService;
	
	@Autowired
	TaskService taskService;
	
	@Autowired
	ListService listService;
	
	@Autowired 
	ProductsService productService;
	
	
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		
		Users user1 = new Users("cesar","cesar98@gmail.com","admin","922402043", 2000);
		Users user2 = new Users("juan","juan@gmail.com","user","1234",2000);
		Users user3 = new Users("alvaro","alavaro@gmail.com","user","1232",2000);
		
		Tasks task = new Tasks("colada","lavar la ropa","por hacer",Calendar.getInstance(),Calendar.getInstance());
		Tasks task1 = new Tasks("cocinar","coninar albondigas","por hacer",Calendar.getInstance(),Calendar.getInstance());
		Tasks task2 = new Tasks("compra","comprar al hiperdino","hecho",Calendar.getInstance(),Calendar.getInstance());
		Tasks task3 = new Tasks("limpiar","lavar la cocina y fregar piso","por hacer",Calendar.getInstance(),Calendar.getInstance());
		Tasks task4 = new Tasks("colada","lavar calsoncillos","por hacer",Calendar.getInstance(),Calendar.getInstance());
		
		Products product = new Products("arroz",2,2.5f,"comprado");
		Products product2 = new Products("pescado",3,2.5f,"comprado");
		Products product3 = new Products("alubias",2,2.5f,"comprado");
		Products product4 = new Products("pasas",2,3.5f,"comprado");
		Products product5 = new Products("pechuga",4,2.5f,"comprado");
		Products product6 = new Products("televisor",1,1000f,"comprado");
		Products product7 = new Products("chrome cast",2,500f,"comprado");
		Products product8 = new Products("refresco",2,2.50f,"comprado");
		Products product9 = new Products("papas",2,1f,"pendiente");
		
		Group group1 = new Group("grupo1","grupo de cocina"); 
		Group group2 = new Group("grupo2","grupo de cine"); 
		Group group3 = new Group("grupo3","grupo de juegos"); 
		
		Lists list = new Lists("lista del superMercado");
		Lists list1 = new Lists("compra worten");
		Lists list2 = new Lists("lista de comida para fiesta");
		
		productService.productAdd(product);
		productService.productAdd(product2);
		productService.productAdd(product3);
		productService.productAdd(product4);
		productService.productAdd(product5);
		productService.productAdd(product6);
		productService.productAdd(product7);
		productService.productAdd(product8);
		productService.productAdd(product9);
		
		userService.addUsers(user1);
		userService.addUsers(user2);
		userService.addUsers(user3);
		
		groupService.groupAdd(group1);
		groupService.groupAdd(group2);
		groupService.groupAdd(group3);
		
		
		
		
		list.setGroup(group1);
		list1.setGroup(group2);
		list2.setGroup(group3);
		
		listService.listAdd(list);
		listService.listAdd(list1);
		listService.listAdd(list2);
		
		
		
		taskService.addTasks(task);
		taskService.addTasks(task1);
		taskService.addTasks(task2);
		taskService.addTasks(task3);
		taskService.addTasks(task4);
		
		Set<Users> users = new HashSet<Users>();
		
			users.add(user1);
			users.add(user2);
			
		group1.setUsers(users);
		groupService.groupAdd(group1);
		users.clear();
		
			users.add(user3);
			users.add(user1);
			
		group3.setUsers(users);	
		groupService.groupAdd(group3);
		users.clear();
		
		users.add(user1);
		users.add(user2);
		
		task1.setUsers(users);
		
		taskService.addTasks(task1);
		users.clear();
		
		users.add(user1);
		users.add(user3);
		
		task2.setUsers(users);
		taskService.addTasks(task2);
		
		users.clear();
		
		users.add(user1);
		users.add(user2);
		
		task3.setUsers(users);
		taskService.addTasks(task3);
		users.clear();
		
		
		users.add(user2);
		
		task4.setUsers(users);
		taskService.addTasks(task4);
		users.clear();
		
		
		users.add(user1);
		
		task.setUsers(users);
		taskService.addTasks(task);
		
		list.setGroup(group1);
		list1.setGroup(group2);
		list2.setGroup(group3);
		
		Set <Products> products = new HashSet<Products>();
		
		products.add(product);
		products.add(product2);
		products.add(product3);
		products.add(product4);
		products.add(product5);
		
		list.setProducts(products);
		listService.listAdd(list);
		products.clear();
		
		products.add(product6);
		products.add(product7);
		
		list1.setProducts(products);
		listService.listAdd(list1);
		products.clear();
		
		products.add(product8);
		products.add(product9);
		
		list2.setProducts(products);
		listService.listAdd(list2);
		products.clear();
		
	}
	
	

}
