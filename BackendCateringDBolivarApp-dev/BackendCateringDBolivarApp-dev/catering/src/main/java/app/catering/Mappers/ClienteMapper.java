package app.catering.Mappers;

import app.catering.DTO.ClienteDTO;
import app.catering.Users.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {
    public ClienteDTO toDTO(Cliente cliente) {
        if (cliente == null) return null;

        ClienteDTO dto = new ClienteDTO();
        dto.setId(cliente.getId());
        dto.setNombre(cliente.getNombre());
        dto.setApellidos(cliente.getApellidos());
        dto.setEmail(cliente.getCorreo());
        return dto;
    }

    // Usar solo cuando se desea crear un cliente desde 0 (registro, no solo asignación por ID)
    public Cliente toEntityFull(ClienteDTO dto) {
        if (dto == null) return null;

        Cliente cliente = new Cliente();
        cliente.setId(dto.getId());
        cliente.setNombre(dto.getNombre());
        cliente.setApellidos(dto.getApellidos());
        cliente.setCorreo(dto.getEmail());
        return cliente;
    }
}


