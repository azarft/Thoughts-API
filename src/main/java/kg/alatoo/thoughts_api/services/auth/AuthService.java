package kg.alatoo.thoughts_api.services.auth;

import kg.alatoo.thoughts_api.dto.UserDTO;
import kg.alatoo.thoughts_api.dto.authorization.AuthRegistrationDTO;
import kg.alatoo.thoughts_api.dto.reset.PasswordResetDTO;

public interface AuthService {
    UserDTO register(AuthRegistrationDTO authRegistrationDTO);

    String verifyEmail(String token);

    void sendPasswordResetRequest(PasswordResetDTO passwordResetDTO);

    String resetPassword(String token, String newPassword);
}
