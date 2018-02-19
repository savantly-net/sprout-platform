package net.savantly.sprout.tenancy;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import net.savantly.sprout.core.domain.tenant.Tenant;
import net.savantly.sprout.core.domain.tenant.TenantRepository;

@Component
public class TenantInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired
	TenantRepository repository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String hostName = request.getRemoteHost();
        Tenant tenant = this.repository.findOneByAliases(hostName);
        if (tenant ==  null) {
        	TenantContext.setCurrentTenant(null);
        } else {
        	TenantContext.setCurrentTenant(tenant.getId());
        }
        
        
        return true;
    }
    @Override
    public void postHandle(
            HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
            throws Exception {
        TenantContext.clear();
    }
}