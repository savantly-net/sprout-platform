package net.savantly.sprout.core.domain.role;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.privilege.PrivilegeDto;

@Data
@Accessors(chain = true)
public class RoleDto implements Role {
    private String name;
    private Set<PrivilegeDto> privileges = new HashSet<>();
}
