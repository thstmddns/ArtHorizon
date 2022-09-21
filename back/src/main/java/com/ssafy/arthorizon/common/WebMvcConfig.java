package com.ssafy.arthorizon.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(this.jwtInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/users/signup")
                .excludePathPatterns("/users/check")
                .excludePathPatterns("/users/login")
                .excludePathPatterns("/users/profile/**")
                .excludePathPatterns("/users/followers/**")
                .excludePathPatterns("/users/followings/**")
                .excludePathPatterns("/search/**")
                .excludePathPatterns("/pieces/**")
                .excludePathPatterns("/game/**")
                .excludePathPatterns("/service/notice")
                .excludePathPatterns("/service/notice/**");
    }

    @Bean
    protected JwtInterceptor jwtInterceptor() {
        return new JwtInterceptor();
    }
}
