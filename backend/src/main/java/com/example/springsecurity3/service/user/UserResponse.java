package com.example.springsecurity3.service.user;

import com.example.springsecurity3.domain.Users;
import lombok.Data;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserResponse {

    private String email;
    private String role;
    private LocalDateTime createdAt;

    public static UserResponse of(@NonNull Users user) {
        UserResponse response = new UserResponse();
        response.setEmail(user.getEmail());
        response.setRole(String.valueOf(user.getRole()));
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }

    public static List<UserResponse> of(@NonNull List<Users> users) {
        return users.stream().map(UserResponse::of).collect(Collectors.toList());
    }
}
