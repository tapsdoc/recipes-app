package com.example.springsecurity3.api;

import com.example.springsecurity3.domain.Recipes;
import com.example.springsecurity3.exception.domain.RecipeNotFoundException;
import com.example.springsecurity3.service.recipes.RecipeRequest;
import com.example.springsecurity3.service.recipes.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/recipes")
@RequiredArgsConstructor
public class RecipeController {

  private final RecipeService recipeService;

  @PostMapping("/add")
  public ResponseEntity<Recipes> addRecipe(@RequestBody RecipeRequest request) {
    return ResponseEntity.ok().body(recipeService.addRecipe(request));
  }

  @GetMapping("/all")
  public ResponseEntity<List<Recipes>> fetchRecipes() {
    return ResponseEntity.ok().body(recipeService.fetchRecipes());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Recipes> getRecipe(@PathVariable Long id) throws RecipeNotFoundException {
    return ResponseEntity.ok(recipeService.getRecipe(id));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
    recipeService.delete(id);
    return ResponseEntity.ok("Recipe deleted successfully");
  }
}
