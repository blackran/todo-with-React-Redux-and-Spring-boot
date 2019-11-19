package com.salem.salem.web;

import com.salem.salem.domain.Task;
import com.salem.salem.service.TaskService;
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
@RequestMapping("/task")
@CrossOrigin
public class TaskControler {
    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            Map<String, String> map = new HashMap<>();
            for(FieldError fieldError: bindingResult.getFieldErrors()){
                map.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(map, HttpStatus.BAD_REQUEST);
        }
        Task task1 = taskService.SaveOrUpdateTask(task);
        return new ResponseEntity<Task>(task1, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Task> getAllClient(){
        return taskService.findAll();
    }


    @GetMapping("/all/{id}")
    public Iterable<Task> getAllClient(@PathVariable String id){
      return taskService.findByClients(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getfindById(@PathVariable String id){
        Optional<Task> projectTasks = taskService.getById(id);
        return new ResponseEntity<Optional<Task>>(projectTasks, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delfindById(@PathVariable String id){
        taskService.delete(id);
        return new ResponseEntity<String>("Clients Suprimer", HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @Valid @RequestBody Task task){
        return taskService.getById(id)
                .map(record -> {
                    record.setTask(task.getTask());
                    record.setEtats(task.getEtats());
                    record.setEdit(task.getEdit());

                    Task task2 = taskService.SaveOrUpdateTask(task);
                    return new ResponseEntity<Task>(task2, HttpStatus.OK);
                }).orElse(ResponseEntity.notFound().build());
    }
}
