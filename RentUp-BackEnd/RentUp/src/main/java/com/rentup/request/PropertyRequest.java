package com.rentup.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PropertyRequest {
    private int propertyId;
    private String address;
    private String areaId;
    private Integer userId;
    private String status;
    private Double area;
    private String preferredTenant;
    private String flatType;
    private int price ;
}
