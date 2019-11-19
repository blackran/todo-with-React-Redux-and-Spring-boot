package com.salem.salem.service;

import com.salem.salem.domain.Clients;
import com.salem.salem.domain.Task;
import com.salem.salem.repository.ClientsRepository;
import com.salem.salem.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientsService {
    @Autowired
    private ClientsRepository clientsRepository;

    public Clients SaveOrUpdateClients(Clients clients){
        return clientsRepository.save(clients);
    }

    public Iterable<Clients> findAll(){
        return clientsRepository.findAll();
    }


    public Optional<Clients> getById(String id) {
        return clientsRepository.findById(id);
    }

    public void delete(String idTask) {
        clientsRepository.deleteById(idTask);
    }
}
