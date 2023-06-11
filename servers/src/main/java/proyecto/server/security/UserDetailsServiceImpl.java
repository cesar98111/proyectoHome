package proyecto.server.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import proyecto.server.entity.Users;
import proyecto.server.service.UserService;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		
		try {
			Users user = userService.getUserByName(username);
			System.out.print(user);
			if(user == null) {
				throw new UsernameNotFoundException(username);
			}
			return User.withUsername(username)
						.password(new BCryptPasswordEncoder().encode(user.getPassword()))
						.roles(user.getRol())
						.build();
		}catch(Exception e) {
			return null;
		}
		
	 	
		
	}
	
	
}
