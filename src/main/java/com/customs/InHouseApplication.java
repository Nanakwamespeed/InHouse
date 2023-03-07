package com.customs;

import com.customs.user.UserController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackageClasses = {com.customs.user.UserController.class, com.customs.menu.MenuController.class, com.customs.CorsConfig.class})
public class InHouseApplication {

    public static void main(String[] args) {
        SpringApplication.run(InHouseApplication.class, args);
    }

}
