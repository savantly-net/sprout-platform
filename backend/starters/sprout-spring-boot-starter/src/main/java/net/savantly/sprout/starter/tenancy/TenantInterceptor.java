package net.savantly.sprout.starter.tenancy;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import net.savantly.sprout.core.domain.tenant.Tenant;
import net.savantly.sprout.core.domain.tenant.TenantRepository;
import net.savantly.sprout.core.tenancy.TenantContext;

public class TenantInterceptor extends HandlerInterceptorAdapter {
	
	private TenantRepository repository;
	
	public TenantInterceptor(TenantRepository repository) {
		this.repository = repository;
	}

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
    	
        String hostName = request.getHeader("host") != null ? request.getHeader("host") : request.getRemoteHost();
        hostName = cleanHostHeader(hostName);
        TenantContext.clear();
        Tenant tenant = this.repository.findOneByAliases(hostName);
        if (tenant ==  null) {
        	TenantContext.setCurrentTenant(null);
        } else {
        	TenantContext.setCurrentTenant(tenant.getId());
        }
        
        
        return true;
    }
    private String cleanHostHeader(String hostName) {
		if (hostName.contains(":")) {
			return hostName.split(":")[0];
		} else return hostName;
	}

	@Override
    public void postHandle(
            HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
            throws Exception {
        TenantContext.clear();
    }
}