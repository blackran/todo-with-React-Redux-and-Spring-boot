package com.salem.salem.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Clients {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @NotBlank(message = "champ requi")
    private String pseudo;
    @NotBlank(message = "champ requi")
    private String  password;

    public Clients() {
    }

    public Clients(String id, @NotBlank(message = "champ requi") String pseudo, @NotBlank(message = "champ requi") String password) {
        this.id = id;
        this.pseudo = pseudo;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
