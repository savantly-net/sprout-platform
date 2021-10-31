package net.savantly.sprout.domain.issue;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;

import net.savantly.sprout.core.security.SproutSecurityContext;
import net.savantly.sprout.core.security.permissions.Permission;
import net.savantly.sprout.core.security.permissions.SproutPermissionEvaluator;

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
		if (Objects.nonNull(targetDomainObject) && currentUserId.isPresent() ) {
			Optional<String> createdBy = targetDomainObject.getCreatedBy();
			if (createdBy.isPresent()) {
				return currentUserId.get().contentEquals(createdBy.get());
			}
		}
		
		return false;
	}

	@Override
	public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
			Permission permission) {
		log.warn("hasPermission by targetId not implemented");
		return false;
	}

}
