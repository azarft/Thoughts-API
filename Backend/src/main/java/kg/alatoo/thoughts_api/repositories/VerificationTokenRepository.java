package kg.alatoo.thoughts_api.repositories;

import kg.alatoo.thoughts_api.entities.tokens.VerificationToken;
import kg.alatoo.thoughts_api.enums.TokenType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByTokenAndTokenType(String token, TokenType tokenType);
}

