package com.spring.assoetu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "commentaire")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @Column(name="contenu",length = 10000000)
    private String content;
    private LocalDate date ;
    @Column(columnDefinition = "bigint default 0")
    private Long liked ;
    @Column(columnDefinition = "bigint default 0")
    private Long disliked ;

    /* La personne qui va poster un commentaire*/
    @ManyToOne(
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    @JsonIgnore
    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinColumn(name = "association_id")
    private Association association ;

    @OneToMany(
            mappedBy = "comment",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Response> responses = new ArrayList<>();

    public void addResponses(Response response){
        responses.add(response) ;
        response.setComment(this);
    }

    public void removeResponses(Response response){
        responses.remove(response) ;
        response.setComment(null);
    }
}

