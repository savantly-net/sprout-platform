package net.savantly.sprout.core.security.permissions;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SproutPermissionRegistry {
    
    private static final Logger log = LoggerFactory.getLogger(SproutPermissionRegistry.class);
    
    private Map<Class<?>, SproutPermissionEvaluator<?>> permissionEvaluatorMap = new HashMap<>();
    
    Set<SproutPermissionEvaluator> evaluatorBeans = new HashSet<>();
    
    public SproutPermissionRegistry(Set<SproutPermissionEvaluator> evaluatorBeans) {
		this.evaluatorBeans = evaluatorBeans;
	}
    
    @PostConstruct
    public void post(){
        evaluatorBeans.stream().forEach(e -> {
            permissionEvaluatorMap.put(e.getEvaluationType(), e);
        });
    }
    
    public void addPermissionEvaluator(Class<?> type, SproutPermissionEvaluator<?> evaluator){
        permissionEvaluatorMap.put(type, evaluator);
    }
    
    public <T> SproutPermissionEvaluator<?> getPermissionEvaluator(Class<T> type){
        return permissionEvaluatorMap.get(type);
    }
    
    public <T> boolean containsPermissionEvaluator(Class<T> type){
        return permissionEvaluatorMap.containsKey(type);
    }

    public boolean containsPermissionEvaluator(String targetType) {
        try {
            Class clazz = Class.forName(targetType);
            return containsPermissionEvaluator(clazz);
        } catch (ClassNotFoundException e) {
            log.error(targetType);
            return false;
        }
    }

    public <T> SproutPermissionEvaluator<?> getPermissionEvaluator(String targetType) throws ClassNotFoundException {
        Class clazz = Class.forName(targetType);
        return getPermissionEvaluator(clazz);
    }

}
