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
@Table(name="List")
public class Lists {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idList;
	
	@Column(name="name", length=50)
	private String name;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)  
	@JoinColumn(name = "fk_List", nullable = false)
	@JsonIgnore
	private Group group;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})  
	@JoinTable(name = "seAnida",
		joinColumns = @JoinColumn(name = "listId"),
		inverseJoinColumns = @JoinColumn(name = "productId")
	)
	@JsonIgnore
	private Set<Products> products = new HashSet<Products>();
	
	
	
	
	
	public Lists() {
		
	}
	public Lists( String name) {
		
		this.name = name;
	}

	public long getIdList() {
		return idList;
	}

	
	public Set<Products> getProducts() {
		return products;
	}
	public void setProducts(Set<Products> products) {
		this.products = products;
	}
	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public void setIdList(long idList) {
		this.idList = idList;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "List [idList=" + idList + ", name=" + name + "]";
	}
	
	
	
}
