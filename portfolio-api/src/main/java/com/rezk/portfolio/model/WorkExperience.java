package com.rezk.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "workExperience")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperience {

    @Id
    private String id;

    private String company;
    private String position;
    private String period;
    private boolean current;

    // Theme colors — kept as strings to stay in sync with the frontend CSS vars
    private String color;
    private String glow;
    private String bg;
    private String border;

    private List<String> responsibilities;

    // Comma-separated tech stack (e.g. "Angular,TypeScript,RxJS")
    // The frontend splits this string to render individual chips
    private String stack;
}
