package com.spring.assoetu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="evenement")
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id ;
    private String type ;
    @Column(name="description")
    private String descp ;
    private LocalDate date ;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image ;

    @JsonIgnore
    @ManyToOne(
            /*fetch = FetchType.LAZY, // nos causera un problème il ne téléchargera pas association*/
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            }
    )
    @JoinColumn(name = "association_id")
    private Association association ;


}
    /*DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDate date = LocalDate.parse(dateString, formatter);*/

    /*LocalDate currentDate = LocalDate.now();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    String formattedDate = currentDate.format(formatter);*/