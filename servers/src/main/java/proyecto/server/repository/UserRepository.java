package proyecto.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto.server.entity.Tasks;
import proyecto.server.entity.Users;


@Repository
public interface UserRepository extends JpaRepository<Users,Long>{
	
	public Optional<Users> findByName(String name);
	
	public List<Users> findByGroupName(String name);
	
	public List<Users> findByTaskIdTask(long idTask);
	

}
