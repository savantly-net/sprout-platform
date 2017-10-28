package net.savantly.sprout.starter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class SproutWebAppInitializer implements WebApplicationInitializer{

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		// TODO Auto-generated method stub
		
	}

/*	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		  // root context
	    AnnotationConfigWebApplicationContext rootContext =
	            new AnnotationConfigWebApplicationContext();
	    rootContext.register(RootConfig.class); // configuration class for root context
	    rootContext.scan("...service", "...dao"); // scan only some packages
	    servletContext.addListener(new ContextLoaderListener(rootContext));

	    // dispatcher servlet 1
	    AnnotationConfigWebApplicationContext webContext1 = 
	            new AnnotationConfigWebApplicationContext();
	    webContext1.setParent(rootContext);
	    webContext1.register(WebConfig1.class); // configuration class for servlet 1
	    webContext1.scan("...web1");            // scan some other packages
	    ServletRegistration.Dynamic dispatcher1 =
	    servletContext.addServlet("dispatcher1", new DispatcherServlet(webContext1));
	    dispatcher1.setLoadOnStartup(1);
	    dispatcher1.addMapping("/subcontext1");
		
	}*/

}
