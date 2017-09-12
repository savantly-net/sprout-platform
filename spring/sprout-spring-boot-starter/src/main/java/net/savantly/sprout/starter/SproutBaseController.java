package net.savantly.sprout.starter;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.Model;

public interface SproutBaseController {

	String index(Model model, HttpServletRequest request, HttpServletResponse response) throws IOException;

}
