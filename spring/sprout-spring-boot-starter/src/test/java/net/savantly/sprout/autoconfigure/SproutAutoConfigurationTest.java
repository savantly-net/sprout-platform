package net.savantly.sprout.autoconfigure;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.transaction.Transactional;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@WebAppConfiguration
@RunWith(SpringRunner.class)
@Transactional
public class SproutAutoConfigurationTest {
	{
		System.setProperty("spring.freemarker.template-loader-path", "classpath:/templates/");
	}
	
	@BeforeClass
	public static void beforeClass() {
		
	}
	
	@Autowired
	WebApplicationContext ctx;
	
	private MockMvc mvc;

	@Before
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
	}
	
	@Test
	public void testInitialization(){
		ctx.getBean(SproutAutoConfiguration.class);
	}
	
	
	@Test
	public void loadIndexPage() throws Exception {
		mvc.perform(get("/")).andExpect(status().isOk());
	}
	
	@Test
	public void loadAdminIndexPage() throws Exception {
		mvc.perform(get("/admin")).andExpect(status().isOk());
	}
	
	@Test
	public void loadAdminStaticFile() throws Exception {
		mvc.perform(get("/admin/test.js")).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.content().contentType("text/javascript"));
	}
	
	@Test
	public void loadAdminAngularRoute() throws Exception {
		mvc.perform(get("/admin/app-menu"))
			.andExpect(status().isOk())
			.andExpect(MockMvcResultMatchers.view().name("admin/index"));
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
	}
}
