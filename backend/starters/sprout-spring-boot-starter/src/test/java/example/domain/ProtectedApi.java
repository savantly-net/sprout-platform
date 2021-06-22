package example.domain;

import net.savantly.sprout.easy.EasyController;

public class ProtectedApi extends EasyController<ProtectedObject, ProtectedObject, String, ProtectedService, ProtectedObjectRepository> {

	public ProtectedApi(ProtectedService service) {
		super(service);
	}

	@Override
	protected String stringToID(String string) {
		return string;
	}

}
