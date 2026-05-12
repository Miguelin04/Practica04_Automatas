package com.ape04.automata.dto;

import java.util.List;

public class ValidationResponse {
    private boolean accepted;
    private String finalState;
    private String message;
    private List<String> path;

    public ValidationResponse() {}

    public ValidationResponse(boolean accepted, String finalState, String message, List<String> path) {
        this.accepted = accepted;
        this.finalState = finalState;
        this.message = message;
        this.path = path;
    }

    public boolean isAccepted() { return accepted; }
    public void setAccepted(boolean accepted) { this.accepted = accepted; }

    public String getFinalState() { return finalState; }
    public void setFinalState(String finalState) { this.finalState = finalState; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public List<String> getPath() { return path; }
    public void setPath(List<String> path) { this.path = path; }
}
