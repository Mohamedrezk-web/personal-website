package com.rezk.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projects")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    private String id;

    private int displayOrder; // controls animation-delay in frontend
    private String image;
    private String title;
    private String description;
    private String category;      // filter key: "angular", "nextjs", "nodejs"
    private String categoryName;  // display label: "Angular", "NextJS", "NodeJS"
    private String githubLink;    // optional — null for professional projects
    private String liveLink;

    // Theme colors
    private String color;
    private String glow;
    private String border;
}
