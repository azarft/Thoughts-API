package kg.alatoo.thoughts_api.services;

import kg.alatoo.thoughts_api.dto.UserDTO;
import kg.alatoo.thoughts_api.dto.authorization.AuthRegistrationDTO;

public interface AuthService {
    UserDTO register(AuthRegistrationDTO authRegistrationDTO);
}
