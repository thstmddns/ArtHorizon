package com.ssafy.arthorizon.common;

import com.ssafy.arthorizon.user.JwtService;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtInterceptor implements HandlerInterceptor {
    @Resource
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }
        String jwt = request.getHeader("jwt");
        System.out.println("Interceptor Called");
        if (jwt != null && this.jwtService.isValid(jwt)) {
            System.out.println("Interceptor Passed");
            return true;
        }
        System.out.println("Invalid Request");
        response.setStatus(401);
        return false;
    }
}
