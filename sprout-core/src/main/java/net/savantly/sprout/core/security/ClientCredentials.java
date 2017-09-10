package net.savantly.sprout.core.security;

public class ClientCredentials {

	String username;
	String password;
	String firstName;
	String lastName;
	String emailAddress;
	
	public String getEmailAddress() {
		return emailAddress;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getPassword() {
		return password;
	}
	public String getUsername() {
		return username;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setUsername(String username) {
		this.username = username;
	}
}
