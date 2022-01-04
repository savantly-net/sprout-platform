package net.savantly.sprout.domain.issue;


import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue,String> {

}
