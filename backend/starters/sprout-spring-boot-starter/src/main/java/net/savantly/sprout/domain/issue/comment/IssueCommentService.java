package net.savantly.sprout.domain.issue.comment;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.util.Converter;

import net.savantly.sprout.easy.EasyService;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.core.publisher.Flux;

public class IssueCommentService extends EasyService<IssueCommentDto, IssueComment, String, IssueCommentRepository> {
//public class IssueCommentService  {

	public IssueCommentService(
			IssueCommentRepository repository,
			Converter<IssueCommentDto, IssueComment> dtoConverter,
			Converter<IssueComment, IssueCommentDto> entityConverter) {
		super(repository, dtoConverter, entityConverter);
	}

	@Autowired
	private IssueCommentRepository issueCommentRepository;




	/*public List<IssueCommentDto> getCommentsByIssueId(String issueId) {
		return this.repository.findByIssueId(issueId).stream().map(this.entityConverter::convert).collect(Collectors.toList());
	}*/

	public Flux<IssueCommentDto> getCommentsByIssueId(String issueId) {
		//return this.repository.findByIssueId(issueId).stream().map(this.entityConverter::convert).collect(Collectors.toList());
		//Flux<IssueComment> defer = Flux.defer(() -> Flux.fromIterable(this.repository.findByIssueId(issueId)));
		Flux<IssueComment> defer = Flux.defer(() -> Flux.fromIterable(issueCommentRepository.findByIssueId(issueId)));
		return defer.map(entityConverter::convert);
	}
}
