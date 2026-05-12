package com.ape04.automata.service;

import com.ape04.automata.dto.ValidationResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AutomataService {

    // Ejercicio 6: IDS (Patrón: SYN ACK+ RST)
    public ValidationResponse validateIDS(List<String> sequence) {
        String state = "A";
        List<String> path = new ArrayList<>();
        path.add(state);

        for (String input : sequence) {
            input = input.trim().toUpperCase();
            switch (state) {
                case "A":
                    if (input.equals("SYN")) state = "B";
                    else state = "INVALID";
                    break;
                case "B":
                    if (input.equals("ACK")) state = "C";
                    else state = "INVALID";
                    break;
                case "C":
                    if (input.equals("ACK")) state = "C";
                    else if (input.equals("RST")) state = "D";
                    else state = "INVALID";
                    break;
                case "D":
                    // Estado de aceptación final, cualquier otra cosa lo hace inválido
                    state = "INVALID";
                    break;
                default:
                    state = "INVALID";
            }
            path.add(input + " -> " + state);
            if (state.equals("INVALID")) break;
        }

        boolean accepted = state.equals("D");
        return new ValidationResponse(accepted, state, 
            accepted ? "Secuencia Válida (Ataque Detectado)" : "Secuencia Inválida", path);
    }

    // Ejercicio 7: IoT (Patrón: HDR (TEMP | HUM)* CRC)
    public ValidationResponse validateIoT(List<String> sequence) {
        String state = "A";
        List<String> path = new ArrayList<>();
        path.add(state);

        for (String input : sequence) {
            input = input.trim().toUpperCase();
            switch (state) {
                case "A":
                    if (input.equals("HDR")) state = "B";
                    else state = "INVALID";
                    break;
                case "B":
                    if (input.equals("TEMP") || input.equals("HUM")) state = "C";
                    else if (input.equals("CRC")) state = "D";
                    else state = "INVALID";
                    break;
                case "C":
                    if (input.equals("TEMP") || input.equals("HUM")) state = "C";
                    else if (input.equals("CRC")) state = "D";
                    else state = "INVALID";
                    break;
                case "D":
                    state = "INVALID";
                    break;
                default:
                    state = "INVALID";
            }
            path.add(input + " -> " + state);
            if (state.equals("INVALID")) break;
        }

        boolean accepted = state.equals("D");
        return new ValidationResponse(accepted, state, 
            accepted ? "Secuencia Válida (Paquete IoT Correcto)" : "Secuencia Inválida", path);
    }

    // Ejercicio 8: Bioinformática (Patrón: K G X* F)
    public ValidationResponse validateBio(List<String> sequence) {
        String state = "A";
        List<String> path = new ArrayList<>();
        path.add(state);

        for (String input : sequence) {
            input = input.trim().toUpperCase();
            switch (state) {
                case "A":
                    if (input.equals("K")) state = "B";
                    else state = "INVALID";
                    break;
                case "B":
                    if (input.equals("G")) state = "C";
                    else state = "INVALID";
                    break;
                case "C":
                    if (input.equals("X")) state = "D";
                    else if (input.equals("F")) state = "E";
                    else state = "INVALID";
                    break;
                case "D":
                    if (input.equals("X")) state = "D";
                    else if (input.equals("F")) state = "E";
                    else state = "INVALID";
                    break;
                case "E":
                    state = "INVALID";
                    break;
                default:
                    state = "INVALID";
            }
            path.add(input + " -> " + state);
            if (state.equals("INVALID")) break;
        }

        boolean accepted = state.equals("E");
        return new ValidationResponse(accepted, state, 
            accepted ? "Secuencia Válida (Secuencia Genética Encontrada)" : "Secuencia Inválida", path);
    }
}
