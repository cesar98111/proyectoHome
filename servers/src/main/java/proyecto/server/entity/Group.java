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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="groupUsers")
public class Group {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long idgroup;
	
	@Column(name="name", length=20)
	private String name;
	
	@Column(name="description", length=20)
	private String description;
	
	public Group() {
		
	}
	public Group( String name, String description) {
		
		this.name = name;
		this.description= description;
	}
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})  
	@JoinTable(name = "pertenece",
		joinColumns = @JoinColumn(name = "groupId"),
		inverseJoinColumns = @JoinColumn(name = "userId")
	)
	@JsonIgnore
	Set<Users> users = new HashSet<Users>();

	public Group( String name, Set<Users> users) {
		
		this.name = name;
		this.users = users;
	}

	
	
	
	
	
	public Long getIdgroup() {
		return idgroup;
	}






	public void setIdgroup(Long idgroup) {
		this.idgroup = idgroup;
	}






	public String getName() {
		return name;
	}






	public void setName(String name) {
		this.name = name;
	}






	public Set<Users> getUsers() {
		return users;
	}






	public void setUsers(Set<Users> users) {
		this.users = users;
	}






	@Override
	public String toString() {
		return "Group [idgroup=" + idgroup + ", name=" + name + ", users=" + users + "]";
	}
	
	
	
}
