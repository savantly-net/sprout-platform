package net.savantly.sprout.starter;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class SproutWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	   @Override
	   protected Class<?>[] getRootConfigClasses() {
	      return null;
	   }

	   @Override
	   protected Class<?>[] getServletConfigClasses() {
	      return new Class[] { SproutWebMvcConfigurer.class };
	   }

	   @Override
	   protected String[] getServletMappings() {
	      return new String[] { "/" };
	   }

	}