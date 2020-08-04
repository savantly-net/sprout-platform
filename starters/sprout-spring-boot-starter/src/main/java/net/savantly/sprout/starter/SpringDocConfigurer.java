package net.savantly.sprout.starter;

import java.util.Objects;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;

import io.swagger.v3.oas.models.Operation;
import net.savantly.sprout.controllers.CrudController;

@Configuration
public class SpringDocConfigurer {

	@Bean
	public OperationCustomizer operationIdCustomizer() {
		OperationCustomizer c = new OperationCustomizer() {
			@Override
			public Operation customize(Operation operation, HandlerMethod handlerMethod) {
				Class<?> superClazz = handlerMethod.getBeanType().getSuperclass();
				if (Objects.nonNull(superClazz) && superClazz.isAssignableFrom(CrudController.class)) {
					// TODO: get the prefix from an annotation if set
					String beanName = handlerMethod.getBeanType().getSimpleName();
					operation.setOperationId(String.format("%s_%s", beanName, handlerMethod.getMethod().getName()));
				}
				return operation;
			}
		};
		return c;
	}
}
