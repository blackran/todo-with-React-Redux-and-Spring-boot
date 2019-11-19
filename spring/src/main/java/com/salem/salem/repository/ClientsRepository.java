package com.salem.salem.repository;

import com.salem.salem.domain.Clients;
import com.salem.salem.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientsRepository extends CrudRepository<Clients, String> {
    Optional<Clients> findById(String id);

    @Override
    void deleteById(String aLong);
}
