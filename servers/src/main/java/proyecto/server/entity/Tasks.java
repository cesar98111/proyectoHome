package proyecto.server.entity;

import java.sql.Date;
import java.util.Calendar;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="Task")
public class Tasks {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long idTask;
	
	@Column(name="name", length=10)
	private String name;
	
	@Column(name="description", length=150)
	private String description;
	
	@Column(name="status",length=20)
	private String status;
	
	@Column(name="creation")
	@Temporal(TemporalType.DATE)
	private Calendar creation;
	
	@Column(name="expire")
	@Temporal(TemporalType.DATE)
	private Calendar expire;

	
	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})  
	@JoinTable(name = "asigna",
		joinColumns = @JoinColumn(name = "taskId"),
		inverseJoinColumns = @JoinColumn(name = "userId")
	)
	@JsonIgnore
	private Set<Users> users = new HashSet<Users>();
	public Tasks() {
		
	}
	public Set<Users> getUsers() {
		return users;
	}
	public void setUsers(Set<Users> users) {
		this.users = users;
	}
	public Tasks( String name, String description, String status, Calendar creation, Calendar expire) {
		super();
		
		this.name = name;
		this.description = description;
		this.status = status;
		this.creation = creation;
		this.expire = expire;
	}

	public long getIdTask() {
		return idTask;
	}

	public void setIdTask(long idTask) {
		this.idTask = idTask;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Calendar getCreation() {
		return creation;
	}

	public void setCreation(Calendar creation) {
		this.creation = creation;
	}

	public Calendar getExpire() {
		return expire;
	}

	public void setExpire(Calendar expire) {
		this.expire = expire;
	}

	@Override
	public String toString() {
		return "Tasks [idTask=" + idTask + ", name=" + name + ", description=" + description + ", status=" + status
				+ ", creation=" + creation + ", expire=" + expire + "]";
	}
	
	
	
	
	
}
