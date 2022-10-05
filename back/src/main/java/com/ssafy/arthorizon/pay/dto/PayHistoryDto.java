package com.ssafy.arthorizon.pay.dto;

import lombok.Data;

@Data
public class PayHistoryDto {

    private int total;
    private int tax_free;
    private int vat;
    private int point;
    private int discount;

}
