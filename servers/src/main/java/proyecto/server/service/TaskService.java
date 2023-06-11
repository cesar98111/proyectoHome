package proyecto.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import proyecto.server.entity.Tasks;
import proyecto.server.exception.ResourceNotFoundException;
import proyecto.server.repository.TaskRepository;

@Service
public class TaskService  {
	@Autowired
	TaskRepository taskRepository;
	
	public Tasks addTasks(Tasks task) {
		return taskRepository.save(task);
	}
	
	public List<Tasks> getTaskByUserId(long userId){
		return taskRepository.findByUsersUserId(userId);
	}
	public List<Tasks> getTask(){
		return taskRepository.findAll();
	}
	
	public Tasks getTaskById(long taskId) {
		return taskRepository.findById(taskId)
				.orElseThrow(()-> new ResourceNotFoundException("tarea no encontrada"));
	}
	

	
	
}
