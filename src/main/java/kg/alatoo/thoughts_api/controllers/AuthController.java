package kg.alatoo.thoughts_api.controllers;

import kg.alatoo.thoughts_api.dto.UserDTO;
import kg.alatoo.thoughts_api.dto.authorization.AuthLoginDto;
import kg.alatoo.thoughts_api.dto.authorization.JwtTokenDto;
import kg.alatoo.thoughts_api.dto.authorization.AuthRegistrationDTO;
import kg.alatoo.thoughts_api.dto.authorization.RefreshTokenRequestDTO;
import kg.alatoo.thoughts_api.entities.RefreshToken;
import kg.alatoo.thoughts_api.entities.User;
import kg.alatoo.thoughts_api.entities.VerificationToken;
import kg.alatoo.thoughts_api.repositories.UserRepository;
import kg.alatoo.thoughts_api.repositories.VerificationTokenRepository;
import kg.alatoo.thoughts_api.services.AuthService;
import kg.alatoo.thoughts_api.services.JwtService;
import kg.alatoo.thoughts_api.services.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthService authService;
    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public UserDTO register(@Validated @RequestBody AuthRegistrationDTO authRegistrationDTO){
        return authService.register(authRegistrationDTO);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);

        if (verificationToken == null) {
            return ResponseEntity.badRequest().body("Invalid verification token.");
        }

        User user = verificationToken.getUser();
        if (user == null) {
            return ResponseEntity.badRequest().body("No user found for this token.");
        }

        // Check if token is expired
        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return ResponseEntity.badRequest().body("Verification token has expired.");
        }

        // Enable the user
        user.setEnabled(true);
        userRepository.save(user);

        // Optionally delete the verification token after successful verification
        verificationTokenRepository.delete(verificationToken);

        return ResponseEntity.ok("Email verified successfully. You can now log in.");
    }

    @PostMapping("/login")
    public JwtTokenDto AuthenticateAndGetToken(@RequestBody AuthLoginDto authRequestDTO){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
        if(authentication.isAuthenticated()){
            System.out.println("Refresh Token sent to user");
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(authRequestDTO.getUsername());
            return JwtTokenDto.builder()
                    .accessToken(jwtService.GenerateToken(authRequestDTO.getUsername()))
                    .token(refreshToken.getToken())
                    .build();

        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }
    }
    @PostMapping("/refreshToken")
    public JwtTokenDto refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        return refreshTokenService.findByToken(refreshTokenRequestDTO.getToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(userInfo -> {
                    String accessToken = jwtService.GenerateToken(userInfo.getUsername());
                    return JwtTokenDto.builder()
                            .accessToken(accessToken)
                            .token(refreshTokenRequestDTO.getToken())
                            .build();
                }).orElseThrow(() -> new RuntimeException("Refresh Token is not in Database!!"));
    }

}
