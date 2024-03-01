package com.example.springsecurity3.service.user;

import com.example.springsecurity3.domain.Users;
import com.example.springsecurity3.exception.domain.EmailExistException;
import com.example.springsecurity3.exception.domain.EmailNotFoundException;
import com.example.springsecurity3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponse addUser(UserRequest request) throws EmailExistException {
        var userExistsEmail = userRepository.findByEmail(request.getEmail());
        if (userExistsEmail.isPresent()) {
            throw new EmailExistException("Email already exists");
        }
        Users user = Users.builder()
            .email(request.getEmail())
            .password(request.getPassword())
            .role(request.getRole())
            .createdAt(LocalDateTime.now())
            .build();
        userRepository.save(user);
        return UserResponse.of(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<Users> users = new ArrayList<>(userRepository.findAll());
        return UserResponse.of(users);
    }

    @Override
    public UserResponse getUser(Long id) {
        Users user = userRepository.findById(id).orElseThrow();
        return UserResponse.of(user);
    }

    @Override
    public UserResponse findUserByEmail(String email) throws EmailNotFoundException {
        Users user = userRepository.findByEmail(email)
            .orElseThrow(() -> new EmailNotFoundException("Email not found"));
        return UserResponse.of(user);
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {
        Users user = userRepository.findById(id).orElseThrow();
        return null;
    }

    @Override
    public void delete(Long id) {
        var user = userRepository.findById(id).orElseThrow();
        userRepository.delete(user);
    }
}
