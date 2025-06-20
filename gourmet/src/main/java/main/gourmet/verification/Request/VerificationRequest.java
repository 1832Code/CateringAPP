package main.gourmet.verification.Request;

import lombok.Data;

@Data
public class VerificationRequest {
    public String email;
    public String code;
}