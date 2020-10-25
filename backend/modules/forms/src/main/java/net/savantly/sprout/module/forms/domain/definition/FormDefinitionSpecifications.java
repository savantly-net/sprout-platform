package net.savantly.sprout.module.forms.domain.definition;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

public class FormDefinitionSpecifications {

	public static Specification<FormDefinition> isFormType(FormType formType) {
		return (Root<FormDefinition> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> criteriaBuilder
				.equal(root.get("formType"), formType);
	}

}
