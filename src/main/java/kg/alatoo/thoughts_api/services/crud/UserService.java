package kg.alatoo.thoughts_api.services.crud;

import kg.alatoo.thoughts_api.dto.UserDTO;
import kg.alatoo.thoughts_api.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO saveUser(UserDTO userDTO);
    User getCurrentUser();
    void deleteUser();
    void deleteUserById(Long id);
    UserDTO findUserByID(Long id);
    List<UserDTO> getAllUsers();
}
