package proyecto.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto.server.entity.Lists;
import proyecto.server.entity.Group;
import proyecto.server.service.GroupsService;
import proyecto.server.service.ListService;

import java.util.Set;
import java.util.ArrayList;
import java.util.HashSet;

@RestController
@RequestMapping("/lists")
public class ListController{
	
	@Autowired
	ListService listService;
	
	@Autowired
	GroupsService groupService;
	
	@PostMapping("/add/{id}")
	public Lists listAdd(@RequestBody Lists list, @PathVariable(name="id") long id) {
		System.out.println("listaa");
		Group group = groupService.groupByID(id);
		
		list.setGroup(group);
		
		return listService.listAdd(list);
		
		
	}
	
	@GetMapping("/list/{name}")
	public ArrayList<Lists> getListByGroups(@PathVariable(name="name") String name){
		
		return listService.getListByGroup(name);
		
	}
	
	
};
