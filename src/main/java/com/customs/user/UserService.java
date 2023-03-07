package com.customs.user;

import com.customs.menu.MenuModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired private UserRepository repo;

    public List<UserModel> getUserByEmail(String email, String password) {
        return repo.findByEmail(email, password);
    }

    public Integer editUser(UserModel user) {
        return repo.editUser(user);
    }

    public List<String> getThemeById(String id) {
        return repo.getThemeById(Integer.parseInt(id));
    }

}
