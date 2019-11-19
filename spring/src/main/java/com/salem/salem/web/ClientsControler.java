package com.salem.salem.web;

import com.salem.salem.domain.Clients;
import com.salem.salem.service.ClientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
@CrossOrigin
public class ClientsControler {
    @Autowired
    private ClientsService clientsService;

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@Valid @RequestBody Clients clients, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            Map<String, String> map = new HashMap<>();
            for(FieldError fieldError: bindingResult.getFieldErrors()){
                map.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(map, HttpStatus.BAD_REQUEST);
        }
        Clients clients1 = clientsService.SaveOrUpdateClients(clients);
        return new ResponseEntity<Clients>(clients1, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Clients> getAllClient(){
        return clientsService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getfindById(@PathVariable String id){
        Optional<Clients> projectClients = clientsService.getById(id);
        return new ResponseEntity<Optional<Clients>>(projectClients, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delfindById(@PathVariable String id){
        clientsService.delete(id);
        return new ResponseEntity<String>("Clients Suprimer", HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @Valid @RequestBody Clients clients){
        return clientsService.getById(id)
                .map(record -> {
                    record.setId(clients.getId());
                    record.setPseudo(clients.getPseudo());
                    record.setPassword(clients.getPassword());

                    Clients clients2 = clientsService.SaveOrUpdateClients(clients);
                    return new ResponseEntity<Clients>(clients2, HttpStatus.OK);
                }).orElse(ResponseEntity.notFound().build());
    }
}
