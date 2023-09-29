package com.spring.assoetu.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="bureau")
public class Bureau {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String firstName ;
    private String lastName ;
    private String status ;
    @Column(name="definition",length = 10000000)
    private String desc ;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image ;

    @ManyToOne(
            fetch = FetchType.EAGER, /* .LAZY a chaque fois on recupère un Bureau on ne charge pas l'associaiton (#EAGER) */
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinColumn(name="association_id") /*la clé étrangère sera crée ici et se nommera 'association_id', sinon par défaut associationId,sans l'existence de @JoinColumn*/
    @JsonIgnore /*le problème que je rencontrais était celle de référencement croisée. les associations ne s'affichait plus.*/
    private Association association ;

}
