package com.customs.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private MenuService service;

    @GetMapping("/get-all")
    public List<MenuModel> getMenuList() {
        return service.getMenus();
    }

    @GetMapping("/add")
    public MenuModel addMenu(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "link") String link,
            @RequestParam(value = "role") String role,
            @RequestParam(value = "created_by") String created_by
    ) {
        MenuModel menu = new MenuModel();
        menu.setName(name);
        menu.setLink(link);
        menu.setRole(role);
        menu.setCreated_by(created_by);
        return service.addMenu(menu);
    }

    @GetMapping("/get-menu")
    public Optional<MenuModel> getMenu(@RequestParam(value = "id") Integer id) {
        return service.getMenu(id);
    }

    @GetMapping("/edit-menu")
    public Integer editMenu(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "link") String link,
            @RequestParam(value = "role") String role,
            @RequestParam(value = "id") Integer id,
            @RequestParam(value = "updated_by") String id_user) {

        MenuModel menu = new MenuModel();
        menu.setName(name);
        menu.setLink(link);
        menu.setRole(role);
        menu.setId(id);
        menu.setUpdated_by(id_user);
        return service.editMenu(menu);
    }

    @GetMapping("/get-by-role")
    public List<MenuModel> getMenusByRole(@RequestParam(value = "role") String role) {
        return service.getMenusByRole(role);
    }

}
