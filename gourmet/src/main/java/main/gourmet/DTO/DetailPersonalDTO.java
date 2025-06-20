package main.gourmet.DTO;

import lombok.Data;

import java.util.List;

@Data
public class DetailPersonalDTO {
    private Long id;
    private List<DetailPersonalInfoDTO> personalInfo;
}
