package com.example.springsecurity3.service.auth;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AuthResponse {

    private String token;
    private String email;
    private String role;
}
