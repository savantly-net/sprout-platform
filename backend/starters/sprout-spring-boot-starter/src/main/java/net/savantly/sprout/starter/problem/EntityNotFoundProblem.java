package net.savantly.sprout.starter.problem;

import java.net.URI;

import javax.annotation.concurrent.Immutable;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

@Immutable
public class EntityNotFoundProblem extends AbstractThrowableProblem {

	private static final long serialVersionUID = 1L;
    static final URI TYPE = URI.create("https://savantly.net/problem/entity-not-found");

    private final String itemTypeName;
    private final String itemId;

    public EntityNotFoundProblem(final String itemTypeName, final String itemId) {
        super(TYPE, "Entity not found", Status.BAD_REQUEST, String.format("%s with identifier: %s was not found", itemTypeName, itemId));
        this.itemTypeName = itemTypeName;
        this.itemId = itemId;
    }

    public String getItemTypeName() {
        return itemTypeName;
    }

    public String getItemId() {
    	return itemId;
    }
}
