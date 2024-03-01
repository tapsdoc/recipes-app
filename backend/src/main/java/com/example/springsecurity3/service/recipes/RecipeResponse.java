package com.example.springsecurity3.service.recipes;

import com.example.springsecurity3.domain.Ingredient;
import com.example.springsecurity3.domain.Recipes;
import lombok.Data;
import org.springframework.lang.NonNull;

import java.util.List;

@Data
public class RecipeResponse {

  private Long id;
  private String name;
  private String description;
  private String imagePath;
  private List<Ingredient> ingredient;

  public static RecipeResponse of(@NonNull Recipes recipes) {
    RecipeResponse response = new RecipeResponse();
    response.setId(recipes.getId());
    response.setName(recipes.getName());
    response.setDescription(recipes.getDescription());
    response.setImagePath(recipes.getImagePath());
    response.setIngredient(recipes.getIngredients());
    return response;
  }
}
