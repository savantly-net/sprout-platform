---
title: Authorization
description: Learn how to configure authorization for the Sprout UI and Server 
---

## Url Authorization  
You may configure authorizations using Spring's expression language.  
The configuration uses `ant` style path matching and http method matching.  

This example restricts GET access to everything under `/reports` to users that have an authority of `ADMIN` or `GENERAL_READ`.  
It also has a catch all expression that restricts access to everything under `/api` to users that have the role `EVERYONE`.  

```yaml
sprout:
  security:
    authorization:
      patterns:
        - path: /reports/**
          expression:
            GET: hasAnyAuthority('ADMIN', 'GENERAL_READ')
        - path: /api/**
          expression:
            GET: hasRole('EVERYONE')
            PUT: hasRole('EVERYONE')
            POST: hasRole('EVERYONE')
            PATCH: hasRole('EVERYONE')
            DELETE: hasRole('EVERYONE')
            TRACE: hasRole('EVERYONE')
```

More sophisticated expressions can be created.  
See the [Spring Documentation](https://docs.spring.io/spring-security/site/docs/3.0.x/reference/el-access.html) for more information.  
Or other tutorials for Spring Expression Language -  
https://www.baeldung.com/spring-expression-language  


## Global Method Security  
You may provide standard `@PreAuthorize, @PostAuthorize, @PostFilter, @Secured` or other method security annotations.  
There is an ACL delegator that provides an extension point for full customization.  
The delegator looks for a bean that can handle the type of object being secured.

Example using the delegator to prohibit `DELETE/UPDATE` by someone other than the owner -  

Create a Permission Evaluator Bean for a specific type of object:  

```java
public class IssuePermissionEvaluator implements SproutPermissionEvaluator<Issue> {

	private static final Logger log = LoggerFactory.getLogger(IssuePermissionEvaluator.class);

	@Override
	public List<String> getEvaluationType() {
		List<String> list = new ArrayList<>();
		list.add(Issue.class.getName());
		return list;
	}

	@Override
	public boolean hasPermission(Authentication authentication, Issue targetDomainObject, Permission permission) {
		switch (permission) {
		case CREATE:
		case READ:
			return true;
		case UPDATE:
		case DELETE:
			return isOwner(targetDomainObject);
		default:
			break;
		}
		return false;
	}

	private boolean isOwner(Issue targetDomainObject) {
		Optional<String> currentUserId = SproutSecurityContext.getCurrentUserId();
		return Objects.nonNull(targetDomainObject) && targetDomainObject.getCreatedBy().isPresent()
				&& currentUserId.isPresent()
				&& currentUserId.get().contentEquals(targetDomainObject.getCreatedBy().get());
	}

}
```


On the method use the `hasPermission` function in the `@PreAuthorize` annotation:  

```java
	/**
	 * Calls permission evaluator after fetching.
	 * 
	 * @param itemId
	 * @return
	 */
	@PostAuthorize("hasPermission(returnObject, 'READ') or hasAuthority('ADMIN')")
	public Issue getById(ID itemId) {
		Optional<E> item = repository.findById(itemId);
		if (item.isPresent()) {
			return entityConverter.convert(item.get());
		} else {
			throw new EntityNotFoundProblem("item", itemId.toString());
		}
	}
```
