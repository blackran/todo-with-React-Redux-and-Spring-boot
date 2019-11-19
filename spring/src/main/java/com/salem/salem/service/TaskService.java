package com.salem.salem.service;

import com.salem.salem.domain.Task;
import com.salem.salem.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task SaveOrUpdateTask(Task task){
        return taskRepository.save(task);
    }

    public Iterable<Task> findAll(){
        return taskRepository.findAll();
    }

    public Optional<Task> getById(String idTask) {
        return taskRepository.findById(idTask);
    }

    public Iterable<Task> findByClients(String idCli) {
        return taskRepository.findByClients(idCli);
    }

    public void delete(String idTask) {
        taskRepository.deleteById(idTask);
    }

}
