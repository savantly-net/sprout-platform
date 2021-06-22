package example.domain;

import com.fasterxml.jackson.databind.util.Converter;

import net.savantly.sprout.easy.EasyService;

public class ProtectedService extends EasyService<ProtectedObject, ProtectedObject, String, ProtectedObjectRepository> {

	public ProtectedService(ProtectedObjectRepository repo, Converter<ProtectedObject, ProtectedObject> c1,
			Converter<ProtectedObject, ProtectedObject> c2) {
		super(repo, c1, c2);
	}

}
