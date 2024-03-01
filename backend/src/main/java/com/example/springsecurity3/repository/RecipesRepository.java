package com.example.springsecurity3.repository;

import com.example.springsecurity3.domain.Recipes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipesRepository extends JpaRepository<Recipes, Long> {
}
