package com.customs.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuRepository repo;

    public List<MenuModel> getMenus() {
        return (List<MenuModel>) repo.findAll();
    }

    public List<MenuModel> getMenusByRole(String role) {return repo.getMenuByRole(role);}

    public MenuModel addMenu(MenuModel menu) {
        return repo.save(menu);
    }

    public Optional<MenuModel> getMenu(Integer id) {
        return repo.findById(id);
    }

    public Integer editMenu(MenuModel menu) {
        return repo.editMenu(menu);
    }

}
