package com.salem.salem.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Task {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @NotBlank(message = "champ requi")
    private String task;
    private boolean etats;
    private boolean edit;
    private String clients;

    public Task() {
    }

    public Task(String id, @NotBlank(message = "champ requi") String task, boolean etats, boolean edit, String clients) {
        this.id = id;
        this.task = task;
        this.etats = etats;
        this.edit = edit;
        this.clients = clients;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public boolean getEtats() {
        return etats;
    }

    public void setEtats(boolean etats) {
        this.etats = etats;
    }

    public boolean getEdit() {
        return edit;
    }

    public void setEdit(boolean edit) {
        this.edit = edit;
    }

    public String getClients() {
        return clients;
    }

    public void setClients(String clients) {
        this.clients = clients;
    }
}
