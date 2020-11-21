package net.savantly.sprout.starter.security.session;

import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.Cookie;

import org.springframework.security.core.GrantedAuthority;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.model.user.UserDto;

// https://www.innoq.com/en/blog/cookie-based-spring-security-session/
// TODO: switch to JWT

public class SignedUserInfoCookie extends Cookie {

	  public static final String NAME = "UserInfo";
	  private static final String PATH = "/";
	  private static final Pattern UID_PATTERN = Pattern.compile("uid=([A-Za-z0-9]*)");
	  private static final Pattern ROLES_PATTERN = Pattern.compile("roles=([A-Z0-9_|]*)");
	  private static final Pattern HMAC_PATTERN = Pattern.compile("hmac=([A-Za-z0-9+/=]*)");
	  private static final String HMAC_SHA_512 = "HmacSHA512";

	  private final Payload payload;
	  private final String hmac;

	  public SignedUserInfoCookie(SproutUser userInfo, String cookieHmacKey) {
	    super(NAME, "");
	    this.payload = new Payload(
	      userInfo.getUsername(),
	      userInfo.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet()));
	    this.hmac = calculateHmac(this.payload, cookieHmacKey);
	    this.setPath(PATH);
	    this.setMaxAge((int) Duration.of(1, ChronoUnit.HOURS).getSeconds());
	    this.setHttpOnly(true);
	  }

	  public SignedUserInfoCookie(Cookie cookie, String cookieHmacKey) throws CookieVerificationFailedException {
	    super(NAME, "");

	    if (!NAME.equals(cookie.getName()))
	      throw new IllegalArgumentException("No " + NAME + " Cookie");

	    this.hmac = parse(cookie.getValue(), HMAC_PATTERN).orElse(null);
	    if (hmac == null)
	      throw new CookieVerificationFailedException("Cookie not signed (no HMAC)");

	    String username = parse(cookie.getValue(), UID_PATTERN).orElseThrow(() -> new IllegalArgumentException(NAME + " Cookie contains no UID"));
	    Set<String> roles = parse(cookie.getValue(), ROLES_PATTERN).map(s -> toSet(s.split("\\|"))).orElse(Collections.EMPTY_SET);
	    this.payload = new Payload(username, roles);

	    if (!hmac.equals(calculateHmac(payload, cookieHmacKey)))
	      throw new CookieVerificationFailedException("Cookie signature (HMAC) invalid");

	    this.setPath(cookie.getPath());
	    this.setMaxAge(cookie.getMaxAge());
	    this.setHttpOnly(cookie.isHttpOnly());
	  }

	  private Set<String> toSet(String[] split) {
		HashSet<String> result = new HashSet<String>(split.length);
		for (int i = 0; i < split.length; i++) {
			result.add(split[i]);
		}
		return result;
	}

	private static Optional<String> parse(String value, Pattern pattern) {
	    Matcher matcher = pattern.matcher(value);
	    if (!matcher.find())
	      return Optional.empty();

	    if (matcher.groupCount() < 1)
	      return Optional.empty();

	    String match = matcher.group(1);
	    if (match == null || match.trim().isEmpty())
	      return Optional.empty();

	    return Optional.of(match);
	  }

	  @Override
	  public String getValue() {
	    return payload.toString() + "&hmac=" + hmac;
	  }

	  public UserDto getUserInfo() {
	    return new UserDto().setName(payload.username).setAuthorities(payload.roles);
	  }

	  private String calculateHmac(Payload payload, String secretKey) {
	    byte[] secretKeyBytes = Objects.requireNonNull(secretKey).getBytes(StandardCharsets.UTF_8);
	    byte[] valueBytes = Objects.requireNonNull(payload).toString().getBytes(StandardCharsets.UTF_8);

	    try {
	      Mac mac = Mac.getInstance(HMAC_SHA_512);
	      SecretKeySpec secretKeySpec = new SecretKeySpec(secretKeyBytes, HMAC_SHA_512);
	      mac.init(secretKeySpec);
	      byte[] hmacBytes = mac.doFinal(valueBytes);
	      return Base64.getEncoder().encodeToString(hmacBytes);

	    } catch (NoSuchAlgorithmException | InvalidKeyException e) {
	      throw new RuntimeException(e);
	    }
	  }

	  private static class Payload {
	    private final String username;
	    private final Set<String> roles;

	    private Payload(String username, Set<String> roles) {
	      this.username = username;
	      this.roles = roles;
	    }

	    @Override
	    public String toString() {
	      return "uid=" + username +
	        "&roles=" + String.join("|", roles);
	    }
	  }
	}