package com.rezk.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "hero")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeroSection {

    @Id
    private String id;

    private String title;
    private String name;
    private String role;
    private String description;
    private String statusLabel;
    private String scrollText;

    private List<SocialLink> socialLinks;
    private List<SkillSatellite> satellites;
    private List<HeroBadge> badges;
}
