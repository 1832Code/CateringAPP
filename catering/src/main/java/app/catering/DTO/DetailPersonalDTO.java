package app.catering.DTO;

import lombok.Data;

import java.util.List;

@Data
public class DetailPersonalDTO {
    private Long id;
    private List<DetailPersonalInfoDTO> personalInfo;
}
