package com.ssafy.arthorizon.config;

import com.ssafy.arthorizon.common.JwtInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableJpaRepositories(basePackages = {"com.ssafy.arthorizon.user.Repository"})
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

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://j7d201.p.ssafy.io:8081", "http://localhost:8081", "http://localhost:8080")
                .allowedMethods("*");
    }
    @Bean
    protected JwtInterceptor jwtInterceptor() {
        return new JwtInterceptor();
    }
}
