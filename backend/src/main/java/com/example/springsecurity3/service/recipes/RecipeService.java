package com.example.springsecurity3.service.recipes;

import com.example.springsecurity3.domain.Recipes;
import com.example.springsecurity3.exception.domain.RecipeNotFoundException;

import java.util.List;

public interface RecipeService {

  Recipes addRecipe(RecipeRequest request);
  List<Recipes> fetchRecipes();
  Recipes getRecipe(Long id) throws RecipeNotFoundException;
  void delete(Long id);
  Recipes update(Long id, RecipeRequest request) throws RecipeNotFoundException;
}
