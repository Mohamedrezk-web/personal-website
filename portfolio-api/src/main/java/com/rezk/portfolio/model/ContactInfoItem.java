package com.rezk.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactInfoItem {
    private String icon;
    private String label;
    private String text;
    private String color;
    private String glow;
    private String bg;
    private String border;
}
