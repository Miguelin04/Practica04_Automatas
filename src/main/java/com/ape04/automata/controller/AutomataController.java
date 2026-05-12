package com.ape04.automata.controller;

import com.ape04.automata.dto.ValidationRequest;
import com.ape04.automata.dto.ValidationResponse;
import com.ape04.automata.service.AutomataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/automata")
public class AutomataController {

    @Autowired
    private AutomataService automataService;

    @PostMapping("/ids")
    public ValidationResponse validateIDS(@RequestBody ValidationRequest request) {
        return automataService.validateIDS(request.getSequence());
    }

    @PostMapping("/iot")
    public ValidationResponse validateIoT(@RequestBody ValidationRequest request) {
        return automataService.validateIoT(request.getSequence());
    }

    @PostMapping("/bio")
    public ValidationResponse validateBio(@RequestBody ValidationRequest request) {
        return automataService.validateBio(request.getSequence());
    }
}
