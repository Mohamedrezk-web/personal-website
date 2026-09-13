package com.rezk.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "technologies")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TechnologySection {

    @Id
    private String id;

    // e.g. { "Angular Ecosystem": ["Angular", "RxJS", ...], ... }
    private Map<String, List<String>> categories;

    // e.g. { "Angular Ecosystem": { icon, color, glow, bg, border }, ... }
    private Map<String, CategoryMeta> categoryMeta;
}
