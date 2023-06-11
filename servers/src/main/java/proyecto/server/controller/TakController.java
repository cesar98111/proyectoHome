package proyecto.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto.server.entity.Tasks;
import proyecto.server.service.TaskService;
import proyecto.server.service.UserService;

@RestController
@RequestMapping("/task")
public class TakController {
	
	@Autowired
	TaskService taskService;
	
	@Autowired
	UserService userService;
	
	@GetMapping("/get/{id}")
	public List<Tasks> taskbyNameUser(@PathVariable("id") long id){
		return taskService.getTaskByUserId(id);
	}
	
	@GetMapping("/get")
	public List<Tasks> getAllTask(){
		return taskService.getTask();
	}
	
	@PostMapping("/insert")
	public Tasks insertTask(@RequestBody Tasks newTask) {
		return taskService.addTasks(newTask);
	}
	
}
