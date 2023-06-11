package proyecto.server.security;

import java.util.Map;
import java.util.function.Function;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Service
public class TokenUtils {
	
	private String ACCESS_TOKEN_SECRET ="ASHDJASGDUYAGSDdsajhbhgdjgJDKGkjasfASDASDgduyaFSDJGasdasdadsFsADFJHFVDSGHJFGJHTSTUHSJDFYUG"; //llave para el token
	private Long VALIDITY_TOKEN = (long) 86400000 ; //milisegundos de un dia
	
	 public String extractUsername(String token) {
		 	System.out.print("hola: "+extractClaim(token, Claims::getSubject));
		    return extractClaim(token, Claims::getSubject);
		  }

	 public Date extractExpiration(String token) {
		    return extractClaim(token, Claims::getExpiration);
		  }

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		    return claimsResolver.apply(extractAllClaims(token));
		  }
	
	private Key getSignInkey() {
		byte[] keyBytes = Decoders.BASE64.decode(ACCESS_TOKEN_SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	@Deprecated
	private Claims extractAllClaims(String token) {
			
			return Jwts.parser().setSigningKey(ACCESS_TOKEN_SECRET.getBytes()).parseClaimsJws(token).getBody();
		  }

	private Boolean isTokenExpired(String token) {
		    return extractExpiration(token).before(new Date());
		  }
	
	
	
	public String generateToken(UserDetails userDetails) {
		
		Map<String, Object> claims = new HashMap<>();
		
		String rol = userDetails.getAuthorities().toString();
		
		
		claims.put("roles", rol);
		
		return createToken(userDetails, claims);
		
		
	}
	
	private String createToken(UserDetails userDetails , Map<String, Object> claims) {
		
		return Jwts.builder()
		.setClaims(claims)
		.setSubject(userDetails.getUsername())
		.setIssuedAt(new Date(System.currentTimeMillis()))
		.setExpiration(new Date(System.currentTimeMillis()+VALIDITY_TOKEN))
		.signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes()))
		.compact();
		
	}
	
	public Boolean ValidateToken(String token, UserDetails user) {
		return (!isTokenExpired(token) && extractUsername(token).equals(user.getUsername()));
		
	}
	
	
}
