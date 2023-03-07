package com.customs.user;

import com.customs.menu.MenuModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calls")
public class UserController {
    @Autowired private UserService service;

    @GetMapping("/login")
    public List<UserModel> login(@RequestParam(value = "email") String email, @RequestParam(value = "password") String password) throws Exception {
        System.out.println("THIS IS THE EMAIL: " + email);
        List<UserModel> user = service.getUserByEmail(email, password);
        if(user.isEmpty()) {
            throw new Exception("Email or password is incorrect");
        } else {
            return user;
        }
    }


    @GetMapping("/get-theme")
    public List<String> getTheme(@RequestParam(value = "id") String id) throws Exception {
        List<String> theme = service.getThemeById(id);
        return theme;
    }

    @GetMapping("/edit-user")
    public Integer editUser(
            @RequestParam(value = "user_name") String user_name,
            @RequestParam(value = "first_name") String first_name,
            @RequestParam(value = "last_name") String last_name,
            @RequestParam(value = "email") String email,
            @RequestParam(value = "role") String role,
            @RequestParam(value = "theme") String theme,
            @RequestParam(value = "id") Integer id,
            @RequestParam(value = "updated_by") Integer id_user) {

        UserModel user = new UserModel();
        user.setUser_name(user_name);
        user.setFirst_name(first_name);
        user.setLast_name(last_name);
        user.setEmail(email);
        user.setTheme(theme);
        user.setRole(role);
        user.setId(id);
        user.setUpdated_by(id_user);
        return service.editUser(user);
    }
}
