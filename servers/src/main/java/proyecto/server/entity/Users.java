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

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users")
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long userId;

	@Column(name="name", length=20)
	private String name;
	@Column(name="email", length=20)
	private String email;
	@Column(name="password",length=140)
	private String password;
	@Column(name="rol", length=30)
	private String rol;
	@Column(name="balance")
	int balance;
	@ManyToMany(cascade = {
			CascadeType.PERSIST, 
			CascadeType.MERGE
	}, mappedBy = "users")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	Set<Tasks> task = new HashSet<Tasks>();
	
	

	@ManyToMany(cascade = {
			CascadeType.PERSIST, 
			CascadeType.MERGE
	}, mappedBy = "users")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	Set<Group> group = new HashSet<Group>();

	
	public Users() {
		
	}
	
	public Users(String name, String email, String rol, String password, int balance) {
		
		this.name= name;
		this.email=email;
		this.rol=rol;
		this.password= password;
		this.balance=balance;
		
	}

	public long getUserID() {
		return userId;
	}

	public void setUserID(long userID) {
		this.userId = userID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public void setEmail(String email) {
		this.email = email;
	}
	public String getEmail() {
		return this.email;
	}
	public String getRol() {
		return rol;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password= password;
	}
	public void setRol(String rol) {
		this.rol = rol;
	}

	public int getBalance() {
		return balance;
	}

	public void setBalance(int balance) {
		this.balance = balance;
	}

	@Override
	public String toString() {
		return "Users [userId=" + userId + ", name=" + name + ", email=" + email + ", password=" + password + ", rol="
				+ rol + "]";
	}

	

	
	
}
