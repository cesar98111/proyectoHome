package proyecto.server.exception;

public class ResourceNotFoundException extends RuntimeException{
	private static final long serialVersionUID = -3510175088574375864L;
	
	 public ResourceNotFoundException() {
	        super();
 }

	  public ResourceNotFoundException(String message) {
	      super(message);
	  }
	
	  public ResourceNotFoundException(String message, Throwable cause) {
	      super(message, cause);
	  }
}
