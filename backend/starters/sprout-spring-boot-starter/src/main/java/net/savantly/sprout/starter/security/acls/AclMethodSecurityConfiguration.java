package net.savantly.sprout.starter.security.acls;

import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

import net.savantly.sprout.core.security.permissions.DelegatingPermissionEvaluator;

@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class AclMethodSecurityConfiguration extends GlobalMethodSecurityConfiguration {

	private DelegatingPermissionEvaluator delegatingPermissionEvaluator;

	public AclMethodSecurityConfiguration(DelegatingPermissionEvaluator delegatingPermissionEvaluator) {
		this.delegatingPermissionEvaluator = delegatingPermissionEvaluator;
	}

	@Override
	protected MethodSecurityExpressionHandler createExpressionHandler() {
		return defaultMethodSecurityExpressionHandler();
	}

	public MethodSecurityExpressionHandler defaultMethodSecurityExpressionHandler() {
		DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
		expressionHandler.setPermissionEvaluator(delegatingPermissionEvaluator);
		return expressionHandler;
	}
}