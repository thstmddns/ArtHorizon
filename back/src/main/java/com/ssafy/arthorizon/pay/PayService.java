package com.ssafy.arthorizon.pay;

import com.ssafy.arthorizon.pay.dto.PayReadyDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class PayService {

    private static final String HOST = "https://kapi.kakao.com";

    public String kakaoPayReadyService(Map<String, String> order, Long userSeq) {

        // 카카오페이로 요청을 보내기 위한 템플릿
        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header를 작성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "5068692ea8574b4af08da22752b24e44");
        headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE);

        // 서버로 요청할 Body를 요청
        HttpEntity<PayReadyDto> body =
                new HttpEntity<>(new PayReadyDto(order, userSeq), headers);

        // 카카오페이 서버와 통신을 시도
        try {







        } catch (Exception e) {
            e.printStackTrace();
        }



        // 결제 단계에서 db에 구매 정보를 등록하기








        return "/pay"; // 이게뭐야

    }

    public String collectSave(Map<String, String> order, Long userSeq) {

        // 콜렉트 엔티티
        // 콜렉트 레포지토리
        // 엔티티 채워넣고
        // 엔티티 저장
        // 트라이캐치로 success, failure 리턴

        return null;

    }

}
