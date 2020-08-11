package net.savantly.sprout.controllers;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.server.PathContainer;
import org.springframework.web.util.pattern.PathPattern;
import org.springframework.web.util.pattern.PathPatternParser;

public class PathPatternRegExTest {

	@Test
	public void test() {

		String p1 = "/admin/{path:[^.]+}";
		String p2 = "/admin/{path:([^.]*}";

		PathPatternParser parser = new PathPatternParser();
		PathPattern pattern1 = parser.parse(p1);
		PathPattern pattern2 = parser.parse(p2);

		PathContainer folder = PathContainer.parsePath("/admin/folder");
		PathContainer subFolder = PathContainer.parsePath("/admin/sub/folder");
		PathContainer subSubFolder = PathContainer.parsePath("/admin/sub/sub/folder");
		PathContainer subSubSubFolder = PathContainer.parsePath("/admin/sub/sub/sub/folder");
		PathContainer file = PathContainer.parsePath("/admin/test.js");
		PathContainer subFile = PathContainer.parsePath("/admin/sub/file.js");

		Assertions.assertTrue(pattern1.matches(folder), "should match folder");
		Assertions.assertFalse(pattern1.matches(subFolder), "should not match subfolder");
		Assertions.assertFalse(pattern1.matches(file), "should not match static file");
		Assertions.assertFalse(pattern1.matches(subFile), "should not match sub-directory static file");

		//Assertions.assertFalse(pattern2.matches(folder), "should match not match folder");
		//Assertions.assertTrue(pattern2.matches(subFolder), "should match subfolder");
		//Assertions.assertTrue(pattern2.matches(subSubFolder), "should match subSubfolder");
		//Assertions.assertTrue(pattern2.matches(subSubSubFolder), "should match subSubSubfolder");
		//Assertions.assertFalse(pattern2.matches(file), "should not match static file");
		//Assertions.assertFalse(pattern2.matches(subFile), "should not match sub-directory static file");
	}

}
