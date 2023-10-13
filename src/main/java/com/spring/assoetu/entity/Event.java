package com.spring.assoetu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@DynamicUpdate
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
    @Column(name="des")
    private String descp ;
    @Column(name="lieu")
    private String place ;
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

    @ManyToMany(
            mappedBy = "events",
            fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    private List<UserInfo> users = new ArrayList<>() ;


}
    /*DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDate date = LocalDate.parse(dateString, formatter);*/

    /*LocalDate currentDate = LocalDate.now();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    String formattedDate = currentDate.format(formatter);*/