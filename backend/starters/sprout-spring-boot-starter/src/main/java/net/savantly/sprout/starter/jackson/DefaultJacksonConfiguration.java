package net.savantly.sprout.starter.jackson;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageImpl;
import org.zalando.problem.ProblemModule;
import org.zalando.problem.violations.ConstraintViolationProblemModule;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.afterburner.AfterburnerModule;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;

@Configuration
@ConditionalOnMissingBean(value = JacksonConfiguration.class)
public class DefaultJacksonConfiguration implements JacksonConfiguration {

	SproutConfigurationProperties props;

	public DefaultJacksonConfiguration(SproutConfigurationProperties props) {
		this.props = props;
	}

	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		configureObjectMapper(mapper);
		return mapper;
	}

	protected ObjectMapper configureObjectMapper(ObjectMapper mapper) {
		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
		mapper.registerModules(jdk8Module(), javaTimeModule(), hibernate5Module(), afterburnerModule(), problemModule(),
				constraintViolationProblemModule(), jacksonPageWithJsonViewModule());
		return mapper;
	}
	
	public Module jacksonPageWithJsonViewModule() {
	    SimpleModule module = new SimpleModule("jackson-page-with-jsonview",
	        Version.unknownVersion());
	    module.addSerializer(PageImpl.class, new PageSerializer());
	    return module;
	}


	/**
	 * Support for Java date and time API.
	 * 
	 * @return the corresponding Jackson module.
	 */
	public JavaTimeModule javaTimeModule() {
		return new JavaTimeModule();
	}

	public Jdk8Module jdk8Module() {
		return new Jdk8Module();
	}

	/*
	 * Support for Hibernate types in Jackson.
	 */
	public Hibernate5Module hibernate5Module() {
		return new Hibernate5Module();
	}

	/*
	 * Jackson Afterburner module to speed up serialization/deserialization.
	 */
	public AfterburnerModule afterburnerModule() {
		return new AfterburnerModule();
	}

	/*
	 * Module for serialization/deserialization of RFC7807 Problem.
	 */
	ProblemModule problemModule() {
		return new ProblemModule().withStackTraces(props.getProblem().isEnableTrace());
	}

	/*
	 * Module for serialization/deserialization of ConstraintViolationProblem.
	 */
	ConstraintViolationProblemModule constraintViolationProblemModule() {
		return new ConstraintViolationProblemModule();
	}

}
