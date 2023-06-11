package proyecto.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto.server.entity.Tasks;
import proyecto.server.entity.Users;
import proyecto.server.exception.ResourceNotFoundException;
import proyecto.server.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public Users addUsers(Users newUser) {
		return userRepository.save(newUser);
	}
	
	public List<Users> getUsers(){
		return userRepository.findAll();
	}
	
	
	public Users getUserByName(String name) {
		return userRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("user not found"));
	}
	
	public List<Users> getUserByGroup (String name){
		return userRepository.findByGroupName(name);
	}
	
	public List<Users> getUserByTasks (long id){
		return userRepository.findByTaskIdTask(id);
	}
	
	public Users modifyUser (long id, Users newUser) {
		return userRepository.findById(id).map((user)->{
			user.setName(newUser.getName());
			user.setEmail(newUser.getEmail());
			user.setBalance(newUser.getBalance());
			user.setPassword(newUser.getPassword());
			
			return userRepository.save(user);
		})
		.orElseThrow(()-> new ResourceNotFoundException("user not found"));
	}
	
	
}
