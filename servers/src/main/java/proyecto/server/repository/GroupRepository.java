package proyecto.server.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto.server.entity.Group;


@Repository
public interface GroupRepository extends JpaRepository<Group, Long>{
	public List<Group> findByUsersName(String name);
}
