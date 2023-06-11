package proyecto.server.security.models;

public class NewUserRequest {
	
	
	private String name;
	private String email;
	private String password;
	
	public NewUserRequest(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "NewUserRequest [name=" + name + ", email=" + email + ", password=" + password + "]";
	}
	
	
	
	
}
