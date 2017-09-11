package net.savantly.sprout.core.domain.oauth.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import net.savantly.sprout.core.domain.oauth.OAuthAccount;

public interface OAuthAccountRepository extends PagingAndSortingRepository<OAuthAccount, String>{

}
