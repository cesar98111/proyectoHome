package proyecto.server.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto.server.entity.Users;
import proyecto.server.security.models.AuthenticationRequest;
import proyecto.server.security.models.NewUserRequest;
import proyecto.server.security.models.TokenInfo;
import proyecto.server.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	TokenUtils tokenUtils;
	
	
	@PostMapping("/login")
	@CrossOrigin
	public ResponseEntity<TokenInfo> login(@RequestBody AuthenticationRequest request){
		System.out.print(request.getNombre()+","+request.getPassword());
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getNombre(), request.getPassword()));
		
		UserDetails userDetail = userDetailsService.loadUserByUsername(request.getNombre());
		
		String token = tokenUtils.generateToken(userDetail);
		
		return ResponseEntity.ok(new TokenInfo(token));
		
		
	}
	@GetMapping("/prueba") 
	String prueba(){
		return "cas";
	}
	@PostMapping("/register")
	public ResponseEntity<TokenInfo> login(@RequestBody NewUserRequest newUser){
		
		userService.addUsers(new Users(newUser.getName(),newUser.getEmail(),"user",newUser.getPassword(),0));
		
		UserDetails userDetails = userDetailsService.loadUserByUsername(newUser.getName());
		
		String token = tokenUtils.generateToken(userDetails);
		
		return ResponseEntity.ok(new TokenInfo(token));
		
		
	}
	
}
