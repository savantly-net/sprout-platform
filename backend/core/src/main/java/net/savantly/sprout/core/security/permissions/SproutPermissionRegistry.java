package net.savantly.sprout.core.security.permissions;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@SuppressWarnings("rawtypes")
public class SproutPermissionRegistry {
    
    private static final Logger log = LoggerFactory.getLogger(SproutPermissionRegistry.class);
    
	private Map<String, SproutPermissionEvaluator> permissionEvaluatorMap = new HashMap<>();
    
    Set<SproutPermissionEvaluator> evaluatorBeans = new HashSet<>();
    
    public SproutPermissionRegistry(Set<SproutPermissionEvaluator> evaluatorBeans) {
		this.evaluatorBeans = evaluatorBeans;
	}
    
    @PostConstruct
    public void post(){
        evaluatorBeans.stream().forEach(e -> {
        	e.getEvaluationType().stream().forEach(t -> {
        		permissionEvaluatorMap.put((String) t, e);
        	});
            
        });
    }
    
    public void addPermissionEvaluator(String type, SproutPermissionEvaluator<?> evaluator){
        permissionEvaluatorMap.put(type, evaluator);
    }
    
    public <T> SproutPermissionEvaluator getPermissionEvaluator(String type){
        return permissionEvaluatorMap.get(type);
    }
    
    public <T> boolean containsPermissionEvaluator(String type){
    	return permissionEvaluatorMap.containsKey(type);
    }

}
