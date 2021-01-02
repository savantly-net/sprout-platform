package net.savantly.sprout.domain.authentication.oauth;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class ImplicitFlowDto {
	private String name;
	private String displayName;
	private String issuerUri;
	private String clientId;
	private String scope;
	private String authorizationUrl;
	private String redirectUrl;
	private String tokenUrl;
	private String userInfoUrl;
	private boolean autoLogin;
}
