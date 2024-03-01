package com.example.springsecurity3.service.recipes;

import com.example.springsecurity3.domain.Ingredient;
import com.example.springsecurity3.domain.Recipes;
import com.example.springsecurity3.exception.domain.RecipeNotFoundException;
import com.example.springsecurity3.repository.IngredientRepository;
import com.example.springsecurity3.repository.RecipesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService{

  private final RecipesRepository recipesRepository;
  private final IngredientRepository ingredientRepository;

  @Override
  public Recipes addRecipe(RecipeRequest request) {

    List<Ingredient> ingredients = request.getIngredients().stream()
      .map(ingredientDTO -> Ingredient.builder()
        .name(ingredientDTO.getName())
        .amount(ingredientDTO.getAmount())
        .build())
      .collect(Collectors.toList());

    Recipes recipe = Recipes.builder()
      .name(request.getName())
      .description(request.getDescription())
      .imagePath(request.getImagePath())
      .ingredients(ingredients)
      .build();
    recipesRepository.save(recipe);
    ingredientRepository.saveAll(ingredients);
    return recipe;
  }

  @Override
  public List<Recipes> fetchRecipes() {
    return recipesRepository.findAll();
  }

  @Override
  public Recipes getRecipe(Long id) throws RecipeNotFoundException {
    return recipesRepository.findById(id).orElseThrow(
      () -> new RecipeNotFoundException("Recipe not found"));
  }

  @Override
  public void delete(Long id) {
    if (id == null) {
      throw new NullPointerException("Id is null");
    }
    recipesRepository.deleteById(id);
  }

  @Override
  public Recipes update(Long id, RecipeRequest request) throws RecipeNotFoundException {
    Recipes recipes = recipesRepository.findById(id).orElseThrow(
      () -> new RecipeNotFoundException("Recipe not found")
    );

    if (request.getName() != null) {
      recipes.setName(request.getName());
    }
    if (request.getImagePath() != null) {
      recipes.setImagePath(request.getImagePath());
    }
    if (request.getDescription() != null) {
      recipes.setDescription(request.getDescription());
    }
    recipesRepository.save(recipes);
    return recipes;
  }
}
