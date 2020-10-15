// Use a different type since our tests use H2
@org.hibernate.annotations.TypeDef(name = "jsonb", typeClass = TextType.class)
package net.savantly.sprout.module.forms.domain;

import org.hibernate.type.TextType;