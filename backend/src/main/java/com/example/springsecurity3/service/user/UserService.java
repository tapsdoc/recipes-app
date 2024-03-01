package com.example.springsecurity3.service.user;

import com.example.springsecurity3.exception.domain.EmailExistException;
import com.example.springsecurity3.exception.domain.EmailNotFoundException;

import java.util.List;

public interface UserService {

    UserResponse addUser(UserRequest request) throws EmailExistException;
    List<UserResponse> getAllUsers();
    UserResponse getUser(Long id);
    UserResponse findUserByEmail(String email) throws EmailNotFoundException;
    UserResponse updateUser(Long id, UserRequest request);
    void delete(Long id);
}
