package com.ssafy.arthorizon.service;

import com.ssafy.arthorizon.user.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    private final String SUCCESS = "SUCCESS";
    private final String FAILURE = "FAILURE";
    private final ServiceService serviceService;
    private final JwtService jwtService;

    public ServiceController(ServiceService serviceService, JwtService jwtService) {
        this.serviceService = serviceService;
        this.jwtService = jwtService;
    }

    @PostMapping("/report")
    public ResponseEntity<String> userReport(@RequestHeader("jwt") String jwt, @RequestBody Map<String, Long> report){

        // 인터셉터가 있어서 jwt가 필요한데 비어있으면 알아서 잡아준다

        if(jwt.isEmpty()){
            //jwt가 비어있으면 실패 처리
            return new ResponseEntity<>(FAILURE, HttpStatus.UNAUTHORIZED);
        } else {
            Long reporterSeq = jwtService.getUserSeq(jwt);
            if(reporterSeq!=null){
                String result = serviceService.userReport(reporterSeq, report);
                if(result.equals("success")){
                    return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
                } else if (result.equals("already done")){
                    return new ResponseEntity<>("ALREADY DONE", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(FAILURE, HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(FAILURE, HttpStatus.UNAUTHORIZED);
            }

        }


    }
}
