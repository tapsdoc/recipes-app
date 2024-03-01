package com.example.springsecurity3.service.recipes;

import com.example.springsecurity3.domain.Ingredient;
import lombok.Data;
import org.springframework.lang.NonNull;

@Data
public class IngredientDTO {

  private String name;
  private Integer amount;

  public static IngredientDTO of(@NonNull Ingredient ingredient) {
    IngredientDTO ingredientDTO = new IngredientDTO();
    ingredientDTO.setName(ingredient.getName());
    ingredientDTO.setAmount(ingredient.getAmount());
    return ingredientDTO;
  }
}
