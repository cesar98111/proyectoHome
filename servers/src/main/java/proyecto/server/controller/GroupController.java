package proyecto.server.controller;

import java.util.List;

import proyecto.server.entity.Group;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto.server.repository.GroupRepository;
import proyecto.server.service.GroupsService;

@RestController
@RequestMapping("/group")
public class GroupController {
	
	@Autowired
	GroupsService groupsService;
	
	@GetMapping("/getGroupByUserName/{name}")
	public List<Group> groupByUserName (@PathVariable(name="name") String name) {
			return groupsService.groupsByUser(name);
	}
}
