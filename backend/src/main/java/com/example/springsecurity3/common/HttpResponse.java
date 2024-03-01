package com.example.springsecurity3.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HttpResponse {

    private int statusCode;
    private String reason;
    private String message;
}
