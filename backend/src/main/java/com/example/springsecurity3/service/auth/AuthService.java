package com.example.springsecurity3.service.auth;

import com.example.springsecurity3.exception.domain.EmailExistException;
import com.example.springsecurity3.exception.domain.EmailNotFoundException;

public interface AuthService {

    AuthResponse login(AuthRequest request) throws EmailNotFoundException;
    RegistrationResponse register(AuthRequest request) throws EmailExistException;
}
