package com.example.springsecurity3.service.auth;

import com.example.springsecurity3.common.Role;
import com.example.springsecurity3.domain.Users;
import com.example.springsecurity3.exception.domain.EmailExistException;
import com.example.springsecurity3.exception.domain.EmailNotFoundException;
import com.example.springsecurity3.repository.UserRepository;
import com.example.springsecurity3.security.JwtService;
import com.example.springsecurity3.service.auth.AuthRequest;
import com.example.springsecurity3.service.auth.AuthResponse;
import com.example.springsecurity3.service.auth.AuthService;
import com.example.springsecurity3.service.auth.RegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    @Override
    public AuthResponse login(AuthRequest request) throws EmailNotFoundException {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
            )
        );
        var user = userRepository.findByEmail(request.email())
            .orElseThrow(() -> new EmailNotFoundException("Email not found"));

        String token = jwtService.generateToken(user);
        return AuthResponse.builder()
            .email(request.email())
            .role(user.getRole().name())
            .token(token)
            .build();
    }

    @Override
    public RegistrationResponse register(AuthRequest request) throws EmailExistException {
        var userExistsEmail = userRepository.findByEmail(request.email());
        if (userExistsEmail.isPresent()) {
            throw new EmailExistException("Email already exists");
        }
        var user = Users.builder()
            .email(request.email())
            .password(passwordEncoder.encode(request.password()))
            .role(Role.APPLICANT)
            .createdAt(LocalDateTime.now())
            .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return RegistrationResponse.builder()
            .token(token)
            .createdAt(user.getCreatedAt())
            .build();
    }
}
