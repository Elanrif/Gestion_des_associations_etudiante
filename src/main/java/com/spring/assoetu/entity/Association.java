package com.spring.assoetu.entity;

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
public class Association {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id ;
    private String name ;
    @Column(name="definition",length = 10000000)
    private String def ;
    @Column(name="description",length = 10000000)
    private String desc;
    @Column(name="date_creation")
    private LocalDate date ;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image ;


    /* je vais faire en sorte que Association affiche tout les entités qui sont en relations.
    * tu dois manager et faire en sorte d'afficher ce que tu veux avec @JsonIgnore dans l'autre entité
    */
    @ManyToMany(
            mappedBy = "associations",
            fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    private List<UserInfo> benevoles = new ArrayList<>() ;

    /*meiux faire JsonIgnore dans le côté @ManyToOne (ToOne) ... sauf cas spéciale*/
    @OneToMany(
            mappedBy = "association",
            cascade = CascadeType.ALL,
            orphanRemoval = true /*si je supprime un membre du bureaus, je veux qu'il soit supprimé dans la BDD*/
    )
    private List<Bureau> bureaus = new ArrayList<>() ;

    /*donc exp : on veut afficher le commentaire , donc le commentaire doit obligatoirement afficher tout les
    * entités auquels il est en relation.
    */
    @OneToMany(
            mappedBy = "association",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Comment> comments = new ArrayList<>() ;

    @OneToMany(
            mappedBy = "association",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Event> events = new ArrayList<>();

    public void addBureaus(Bureau bureau){
        bureaus.add(bureau);
        bureau.setAssociation(this);
    }

    public void removeBureaus(Bureau bureau){
        bureaus.remove(bureau);
        bureau.setAssociation(null);
    }

    public void addComments(Comment comment){
        comments.add(comment);
        comment.setAssociation(this);
    }

    public void removeComment(Comment comment){
        comments.add(comment);
        comment.setAssociation(null);
    }

    public void addEvents(Event event){
        events.add(event);
        event.setAssociation(this);
    }

    public void removeEvents(Event event){
        events.remove(event);
        event.setAssociation(null);
    }


}
