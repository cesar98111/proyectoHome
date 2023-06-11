package proyecto.server.security;

import java.io.IOException;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Component
public class JwtAuthentication extends OncePerRequestFilter {
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	TokenUtils tokenUtils;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		final String authorizationHeader = request.getHeader("authorization");
		
		String username= null;
		String jwt= null;
		
		if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			jwt = authorizationHeader.substring(7);
			username = tokenUtils.extractUsername(jwt);
			System.out.print("username"+username);
		}
		
		if(username != null && SecurityContextHolder.getContext().getAuthentication()== null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
			
			if(tokenUtils.ValidateToken(jwt, userDetails)) {
				
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails,null,userDetails.getAuthorities()
						);
				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				
			}
		}
		
		filterChain.doFilter(request, response);
	}
	
	
}
