package proyecto.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto.server.entity.Products;


@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
	public List<Products> findByListName(String name);
}
