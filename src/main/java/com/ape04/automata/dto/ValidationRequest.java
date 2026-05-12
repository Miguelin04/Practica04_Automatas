package com.ape04.automata.dto;

import java.util.List;

public class ValidationRequest {
    private List<String> sequence;

    public List<String> getSequence() {
        return sequence;
    }

    public void setSequence(List<String> sequence) {
        this.sequence = sequence;
    }
}
