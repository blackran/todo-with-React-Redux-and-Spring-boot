package com.salem.salem.repository;

import com.salem.salem.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepository  extends CrudRepository<Task, String> {
    Optional<Task> findById(String id);

    Iterable<Task> findByClients(String id);

    @Override
    void deleteById(String aLong);
}
