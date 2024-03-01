package com.example.springsecurity3.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Ingredient {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  private Integer amount;

  @Builder
  public Ingredient(String name, Integer amount) {
    this.name = name;
    this.amount = amount;
  }
}
