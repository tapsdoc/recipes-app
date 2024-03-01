package com.example.springsecurity3.service.recipes;

import lombok.Data;

import java.util.List;

@Data
public class RecipeRequest {

  private String name;
  private String description;
  private String imagePath;
  private List<IngredientDTO> ingredients;
}
