package proyecto.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto.server.entity.Lists;
import proyecto.server.exception.ResourceNotFoundException;
import proyecto.server.repository.ListRepository;

import java.util.ArrayList;

@Service
public class ListService {
	@Autowired
	ListRepository listRepository;
	
	public Lists listAdd(Lists newList) {
		return listRepository.save(newList);
	}	
	
	public Lists getListById(long id) {
		return listRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("lista no encontrada"));
		
	}
	
	public ArrayList<Lists> getListByGroup(String name){
		return listRepository.findByGroupName(name);
		
	}
}
