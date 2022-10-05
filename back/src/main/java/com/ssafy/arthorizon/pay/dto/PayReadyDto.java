package com.ssafy.arthorizon.pay.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Data
public class PayReadyDto {

    private String cid; // 가맹점 정보
    private String partner_order_id; // 주문번호
    private String partner_user_id; // 구매자 정보
    private String item_name;
    private String total_amount;
    private String approval_url;
    private String cancel_url;
    private String fail_url;

    public PayReadyDto(Map<String, String> order, Long userSeq) {
        String pieceSeq = order.get("pieceSeq");
        String pieceTitleKr = order.get("pieceTitleKr");
        String piecePrice = order.get("piecePrice");

        // order 안에 아이템 이름과 가격이 있음
        this.cid = "TC0ONETME";
        this.partner_order_id = pieceSeq + "_" + userSeq;
        this.partner_user_id = String.valueOf(userSeq);
        this.item_name = pieceTitleKr;
        this.total_amount = piecePrice;
        this.approval_url = "http://localhost:8081/api/my-pay/success";
        this.cancel_url = "http://localhost:8081/api/my-pay/cancel";
        this.fail_url = "http://localhost:8081/api/my-pay/fail";

    }

}
