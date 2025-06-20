package main.gourmet.Mappers;

import org.springframework.stereotype.Component;

import main.gourmet.DTO.ClienteDTO;
import main.gourmet.Entity.User;

@Component
public class ClienteMapper {
    public ClienteDTO toDTO(User cliente) {
        if (cliente == null) return null;

        ClienteDTO dto = new ClienteDTO();
        dto.setId(cliente.getId());
        dto.setNombre(cliente.getFirstName());
        dto.setApellidos(cliente.getLastName());
        dto.setEmail(cliente.getEmail());
        return dto;
    }

    // Usar solo cuando se desea crear un cliente desde 0 (registro, no solo asignación por ID)
    public User toEntityFull(ClienteDTO dto) {
        if (dto == null) return null;

        User cliente = new User();
        cliente.setId(dto.getId());
        cliente.setFirstName(dto.getNombre());
        cliente.setLastName(dto.getApellidos());
        cliente.setEmail(dto.getEmail());
        return cliente;
    }
}


