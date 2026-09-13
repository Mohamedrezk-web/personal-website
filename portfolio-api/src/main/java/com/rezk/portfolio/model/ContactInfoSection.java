package com.rezk.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "contactInfo")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactInfoSection {

    @Id
    private String id;

    private String eyebrow;
    private String title;
    private String subtitle;

    private List<ContactInfoItem> items;
}
