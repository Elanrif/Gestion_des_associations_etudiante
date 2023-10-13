package com.spring.assoetu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Fetch;

import java.time.LocalDate;

@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Response {
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


    /*
    * Quand j'ai une reponse en même temps j'utilise Helper methodes de Comment et UserInfo
    * pour synchroniser les objets référencé.
    * donc sur le service , je dois avoir l'ID de UserInfo et Comment
    */
    @JsonIgnore
    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            })
    @JoinColumn(name = "comment_id")
    private Comment comment ;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            }
    )
    @JoinColumn(name = "user_id")
    private UserInfo userReply;
}
