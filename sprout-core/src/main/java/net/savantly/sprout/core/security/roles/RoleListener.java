package net.savantly.sprout.core.security.roles;

/**
 * Add an annotation to the method used for a callback 
 * A callback method must not invoke EntityManager or Query methods!
 * 
 * <code>@PrePersist</code>     Executed before the entity manager persist operation is actually executed or cascaded. This call is synchronous with the persist operation.
 * <code>@PreRemove</code>      Executed before the entity manager remove operation is actually executed or cascaded. This call is synchronous with the remove operation.
 * <code>@PostPersist</code>    Executed after the entity manager persist operation is actually executed or cascaded. This call is invoked after the database INSERT is executed.
 * <code>@PostRemove</code>     Executed after the entity manager remove operation is actually executed or cascaded. This call is synchronous with the remove operation.
 * <code>@PreUpdate</code>      Executed before the database UPDATE operation.
 * <code>@PostUpdate</code>     Executed after the database UPDATE operation.
 * <code>@PostLoad</code>       Executed after an entity has been loaded into the current persistence context or an entity has been refreshed.
 */
public class RoleListener {
    
    public void doSomething(Role entity){
        
    }

}