package com.example.springsecurity3.service.user;

import com.example.springsecurity3.common.Role;
import lombok.Data;

@Data
public class UserRequest {

    private String email;
    private String password;
    private Role role;
}