package kg.alatoo.thoughts_api.services;

import kg.alatoo.thoughts_api.dto.UserDTO;
import kg.alatoo.thoughts_api.dto.authorization.AuthRegistrationDTO;
import kg.alatoo.thoughts_api.entities.Role;
import kg.alatoo.thoughts_api.entities.User;
import kg.alatoo.thoughts_api.entities.VerificationToken;
import kg.alatoo.thoughts_api.mappers.UserMapper;
import kg.alatoo.thoughts_api.repositories.RoleRepository;
import kg.alatoo.thoughts_api.repositories.UserRepository;
import kg.alatoo.thoughts_api.repositories.VerificationTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final VerificationTokenRepository verificationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper, VerificationTokenRepository verificationTokenRepository, PasswordEncoder passwordEncoder, MailService mailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
        this.verificationTokenRepository = verificationTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
    }

    @Override
    public UserDTO register(AuthRegistrationDTO authRegistrationDTO) {
        Role role = roleRepository.findByName("ROLE_USER");

        User user = userMapper.authRegistrationDtoToUserEntity(authRegistrationDTO);
        user.setRoles(Set.of(role));
        user.setPassword(passwordEncoder.encode(authRegistrationDTO.getPassword()));
        user.setEnabled(false); // Set enabled to false initially

        User savedUser = userRepository.save(user);

        // Generate verification token
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, savedUser);
        verificationTokenRepository.save(verificationToken);

        // Send verification email
        String verificationUrl = "http://localhost:8080/api/v1/auth/verify-email?token=" + token;
        String subject = "Email Verification";
        String body = "Please click the following link to verify your email: " + verificationUrl;

        mailService.sendEmail(savedUser.getEmail(), subject, body);

        return userMapper.userToUserDto(savedUser);
    }
}
