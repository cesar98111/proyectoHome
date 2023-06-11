package proyecto.server.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto.server.entity.Group;
import proyecto.server.exception.ResourceNotFoundException;
import proyecto.server.repository.GroupRepository;

@Service
public class GroupsService {
	
	@Autowired
	GroupRepository groupRepository;
	
	public Group groupAdd(Group newGroup) {
		return groupRepository.save(newGroup);
	}
	
	public Group groupByID(long id) {
		return groupRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("grupo no encontrado"));
	}
	
	public List<Group> groupsByUser(String name){
		return groupRepository.findByUsersName(name);
	}
}
