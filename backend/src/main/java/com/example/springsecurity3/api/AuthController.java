package com.example.springsecurity3.api;

import com.example.springsecurity3.exception.domain.EmailExistException;
import com.example.springsecurity3.exception.domain.EmailNotFoundException;
import com.example.springsecurity3.service.auth.AuthRequest;
import com.example.springsecurity3.service.auth.AuthResponse;
import com.example.springsecurity3.service.auth.AuthService;
import com.example.springsecurity3.service.auth.RegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody AuthRequest request) throws EmailExistException {
        return ResponseEntity.ok().body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) throws EmailNotFoundException {
        return ResponseEntity.ok().body(authService.login(request));
    }
}
