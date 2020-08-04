package net.savantly.sprout.server.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.controllers.CrudController;
import net.savantly.sprout.server.domain.MyEntity;
import net.savantly.sprout.server.domain.MyRepository;

@RequestMapping("/api/my-example")
@RestController
public class MyRestApi extends CrudController<MyEntity, String, MyRepository>{

	public MyRestApi(MyRepository repository) {
		super(repository);
	}

}
