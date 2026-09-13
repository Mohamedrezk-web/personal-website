package com.rezk.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "about")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AboutSection {

    @Id
    private String id;

    private String eyebrow;
    private String title;
    private String titleAccent;
    private String image;
    private String imageAlt;

    private List<String> bio;
    private List<StatCard> statCards;
}
