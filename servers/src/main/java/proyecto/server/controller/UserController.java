package proyecto.server.controller;

import java.util.List;
import java.util.Set;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto.server.entity.Tasks;
import proyecto.server.entity.Users;
import proyecto.server.service.GroupsService;
import proyecto.server.service.TaskService;
import proyecto.server.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	GroupsService groupService;
	
	@Autowired
	TaskService taskService;
	
	@GetMapping("/get/users")
	public List<Users> getAllUsers(){
		return userService.getUsers();
		
	}
	
	@GetMapping("/get/{name}")
	public Users getUserByName(@PathVariable(name="name") String name ) {
		
		return userService.getUserByName(name);
	}
	@GetMapping("/currentUser")
	public Users getCurrentUser() {
		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		return userService.getUserByName(name);
	}
	
	@GetMapping("/getByGroup/{name}")
	public List<Users> getUserByGroup (@PathVariable(name="name") String name){
		
		
		return userService.getUserByGroup(name);
		
	}
	
	@PostMapping("/insertUser/{id}/{name}")
	public void insertUserInTasks(@PathVariable(name="id") long id, @PathVariable(name="name") String name){
		
		
		Tasks task= taskService.getTaskById(id);
		Users user = userService.getUserByName(name);
		
		List<Users> lisUsers = userService.getUserByTasks(id);
		System.out.print(lisUsers);
		Set<Users> users = new HashSet<Users>();
		for(int i=0; i<lisUsers.size();i++) {
			users.add(lisUsers.get(i));
		}
		
		users.add(user);
		
		task.setUsers(users);
		
		taskService.addTasks(task);

		
	}
	
	@GetMapping("/get/Bytask/{id}")
	public List<Users> getTaskById(@PathVariable(name="id") long id) {
		return userService.getUserByTasks(id);
	}
	
	@PutMapping("/modify/{id}")
	public Users  modifyUserById(@PathVariable(name="id") long id, @RequestBody Users newUser) {
		
		return userService.modifyUser(id, newUser);
		
	}
	
}
