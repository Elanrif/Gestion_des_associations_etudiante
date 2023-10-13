package com.spring.assoetu.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;

@Data
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="utilisateur")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String firstName ;
    private String lastName ;
    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'USER'")
    private String role ;
    private String password ;
    @Column(unique = true)
    private String email ;
    @Column(unique=true)
    private String apogee ;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image ;

    @JsonIgnore
    @ManyToMany(

            fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinTable(
            name="benevoles",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="association_id") /*je nomme le 'name' comme je veux, respectivement, il referencera la table USER et ASSO*/

    )
    private List<Association> associations = new ArrayList<>() ;

    @JsonIgnore
    @ManyToMany(
           // fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinTable(
            name="user_event",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="event_id") /*je nomme le 'name' comme je veux, respectivement, il referencera la table USER et ASSO*/

    )
    private List<Event> events = new ArrayList<>() ;

    /*un USER peut poster un commentaire*/
    @JsonIgnore
    @OneToMany(
            mappedBy = "userInfo",
             cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Comment> comments = new ArrayList<>();

    /*User userResponse la personne qui va poster une REPONSE*/

    /*je fais @JsonIgnore car ma logique et que dans association j'afficher Response et que ce dernier affiche l'USER qui va répondre*/
    @JsonIgnore
    @OneToMany(
            mappedBy = "userReply",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Response> responses = new ArrayList<>();


    /*helpers methodes , méthodes utilitaire*/

    public void addEvents(Event event){
        events.add(event) ;
        event.getUsers().add(this) ;
    }

    public void removeEvents(Event event){
        events.remove(event) ;
        event.getUsers().remove(this) ;
    }
    public void addAssociations(Association association){
        associations.add(association) ;
        association.getBenevoles().add(this);
    }

    public void removeAssociations(Association association){
        associations.remove(association);
        association.getBenevoles().remove(this);
    }

    public void addComments(Comment comment){
        comments.add(comment);
        comment.setUserInfo(this);
    }

    public void removeComments(Comment comment){
        comments.remove(comment);
        comment.setUserInfo(null);
    }

    public void addResponses(Response response){
        responses.add(response) ;
        response.setUserReply(this);
    }

    public void removeResponses(Response response){
        responses.remove(response) ;
        response.setUserReply(null);
    }


}
