package net.savantly.sprout.starter;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class DefaultMvcController {
	
	
	@RequestMapping({"", "index"})
	public ModelAndView index() throws IOException {
		String index = "index";
		ModelAndView modelAndView = new ModelAndView("index");
		
		return modelAndView;
	}

}
