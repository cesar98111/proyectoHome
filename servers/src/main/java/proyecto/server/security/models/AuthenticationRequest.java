package proyecto.server.security.models;





public class AuthenticationRequest {
	private String nombre;
	private String password;
	
	
	public AuthenticationRequest() {
		
	}
	public AuthenticationRequest(String nombre, String password) {
		super();
		this.nombre = nombre;
		this.password = password;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "AuthenticationRequest [nombre=" + nombre + ", password=" + password + "]";
	}
	
	
}
