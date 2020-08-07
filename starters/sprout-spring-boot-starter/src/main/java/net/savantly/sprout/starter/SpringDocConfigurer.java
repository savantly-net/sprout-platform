package net.savantly.sprout.starter;

import java.util.Objects;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;

import io.swagger.v3.oas.models.Operation;
import net.savantly.sprout.controllers.CrudController;
import net.savantly.sprout.rest.openapi.SproutOpenApiCustomizer;

@Configuration
public class SpringDocConfigurer {

	@Bean
	public OperationCustomizer operationIdCustomizer() {
		OperationCustomizer c = new OperationCustomizer() {
			@Override
			public Operation customize(Operation operation, HandlerMethod handlerMethod) {
				Class<?> superClazz = handlerMethod.getBeanType().getSuperclass();
				if (Objects.nonNull(superClazz) && superClazz.isAssignableFrom(CrudController.class)) {
					String prefix = handlerMethod.getBeanType().getSimpleName();
					SproutOpenApiCustomizer annotation = handlerMethod.getBeanType().getAnnotation(SproutOpenApiCustomizer.class);
					if (Objects.nonNull(annotation) && Objects.nonNull(annotation.operationIdPrefix())) {
						prefix = annotation.operationIdPrefix();
					}
					operation.setOperationId(String.format("%s%s", prefix, capitalizeFirst(handlerMethod.getMethod().getName())));
				}
				return operation;
			}

			private String capitalizeFirst(String str) {
				String firstChar = str.substring(0, 1).toUpperCase();
				if (str.length() > 1) {
					return String.format("%s%s", firstChar, str.substring(1));
				} else return firstChar;
			}
		};
		return c;
	}
}
