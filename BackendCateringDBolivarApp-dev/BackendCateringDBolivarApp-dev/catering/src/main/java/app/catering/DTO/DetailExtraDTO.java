package app.catering.DTO;

import java.util.List;
import lombok.Data;

@Data
public class DetailExtraDTO {
    private Long id;
    private List<DetailExtraInfoDTO> extraInfo;

}
