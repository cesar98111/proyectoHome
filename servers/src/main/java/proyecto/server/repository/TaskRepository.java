package proyecto.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import proyecto.server.entity.Tasks;

@Repository
public interface TaskRepository extends JpaRepository<Tasks,Long>{
	public List<Tasks> findByUsersUserId(Long userId);
}
