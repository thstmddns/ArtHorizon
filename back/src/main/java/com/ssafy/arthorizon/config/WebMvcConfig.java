package com.ssafy.arthorizon.config;

import com.ssafy.arthorizon.common.JwtInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//@EnableJpaRepositories(basePackages = {"com.ssafy.arthorizon.user.Repository"})
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

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedHeaders("*")
//                .exposedHeaders("*")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .maxAge(6000);
//    }
    @Bean
    protected JwtInterceptor jwtInterceptor() {
        return new JwtInterceptor();
    }
}
