package proyecto.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto.server.entity.Lists;
import java.util.ArrayList;

@Repository
public interface ListRepository extends JpaRepository<Lists, Long>{
	
	public ArrayList<Lists> findByGroupName(String name);
	
}
