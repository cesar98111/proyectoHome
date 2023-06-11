package proyecto.server.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="product")
public class Products {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long idProduct;
	
	@Column(name="name", length=20)
	private String name;
	
	@Column(name="quantity")
	private int quantity;
	
	@Column(name="price")
	private float price;
	
	@Column(name="Status", length=30)
	private String status;
	
	@ManyToMany(cascade = {
			CascadeType.PERSIST, 
			CascadeType.MERGE
	}, mappedBy = "products")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<Lists> list = new HashSet<Lists>();
	
	public Products() {
		
	}
	
	public Products( String name, int quantity, float price, String status) {
		super();
		
		this.name = name;
		this.quantity = quantity;
		this.price = price;
		this.status = status;
	
	}

	public long getIdProduct() {
		return idProduct;
	}

	public void setIdProduct(long idProduct) {
		this.idProduct = idProduct;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Set<Lists> getList() {
		return list;
	}

	public void setList(Set<Lists> list) {
		this.list = list;
	}

	@Override
	public String toString() {
		return "Products [idProduct=" + idProduct + ", name=" + name + ", quantity=" + quantity + ", price=" + price
				+ ", status=" + status + ", list=" + list + "]";
	}
	
	
}
