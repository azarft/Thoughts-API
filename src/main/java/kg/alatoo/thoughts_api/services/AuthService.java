package kg.alatoo.thoughts_api.services;

import kg.alatoo.thoughts_api.dto.UserDTO;
import kg.alatoo.thoughts_api.dto.authorization.AuthRegistrationDTO;
import kg.alatoo.thoughts_api.dto.reset.PasswordResetDTO;
import kg.alatoo.thoughts_api.entities.User;
import kg.alatoo.thoughts_api.entities.VerificationToken;
import kg.alatoo.thoughts_api.enums.TokenType;

import java.util.Calendar;
import java.util.UUID;

public interface AuthService {
    UserDTO register(AuthRegistrationDTO authRegistrationDTO);

    String verifyEmail(String token);

    void sendPasswordResetRequest(PasswordResetDTO passwordResetDTO);

    String resetPassword(String token, String newPassword);
}
