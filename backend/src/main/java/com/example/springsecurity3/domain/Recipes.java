package com.example.springsecurity3.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Recipes {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  private String description;
  private String imagePath;
  @OneToMany(
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  private List<Ingredient> ingredients = new ArrayList<>();

  @Builder
  public Recipes(String name, String description, String imagePath, List<Ingredient> ingredients) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

  public void addIngredient(Ingredient ingredient) {
    if (!ingredients.contains(ingredient)) {
      ingredients.add(ingredient);
    }
  }

  public void removeIngredient(Ingredient ingredient) {
    ingredients.remove(ingredient);
  }
}
