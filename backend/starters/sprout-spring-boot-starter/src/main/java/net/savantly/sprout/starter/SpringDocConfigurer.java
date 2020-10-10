package net.savantly.sprout.starter;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;

import io.swagger.v3.oas.models.Operation;
import net.savantly.sprout.rest.crud.CrudController;
import net.savantly.sprout.rest.crud.CrudProjectionController;
import net.savantly.sprout.rest.crud.PageAndSortController;
import net.savantly.sprout.rest.crud.PageAndSortProjectionController;
import net.savantly.sprout.rest.openapi.SproutOpenApiCustomizer;

@Configuration
public class SpringDocConfigurer {
	
	List<Class<?>> abstractControllerClasses = Arrays.asList(
			CrudController.class,
			CrudProjectionController.class,
			PageAndSortController.class,
			PageAndSortProjectionController.class);

	@Bean
	public OperationCustomizer operationIdCustomizer() {
		OperationCustomizer c = new OperationCustomizer() {
			@Override
			public Operation customize(Operation operation, HandlerMethod handlerMethod) {
				if(handledByAnnotation(operation, handlerMethod)) {}
				else if (extendsControllerClass(operation, handlerMethod)) {}
				return operation;
			}
			
			private boolean extendsControllerClass(Operation operation, HandlerMethod handlerMethod) {
				Class<?> superClazz = handlerMethod.getBeanType().getSuperclass();
				if (Objects.nonNull(superClazz) && abstractControllerClasses.stream().anyMatch(c -> superClazz.isAssignableFrom(c))) {
					String prefix = handlerMethod.getBeanType().getSimpleName();
					assignId(operation, handlerMethod, prefix);
					return true;
				} else {
					return false;
				}
			}
			
			private boolean handledByAnnotation(Operation operation, HandlerMethod handlerMethod) {
				SproutOpenApiCustomizer annotation = handlerMethod.getBeanType().getAnnotation(SproutOpenApiCustomizer.class);
				if (Objects.nonNull(annotation) && Objects.nonNull(annotation.operationIdPrefix())) {
					assignId(operation, handlerMethod, annotation.operationIdPrefix());
					return true;
				} else {
					return false;
				}
			}
			
			private void assignId(Operation operation, HandlerMethod handlerMethod, String prefix) {
				operation.setOperationId(String.format("%s%s", prefix, capitalizeFirst(handlerMethod.getMethod().getName())));
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
