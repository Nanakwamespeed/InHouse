package com.customs.menu;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuRepository extends CrudRepository<MenuModel, Integer> {


    @Transactional
    @Modifying
    @Query(value = "UPDATE sidebar_menus e " +
            "SET  e.name=COALESCE(NULLIF(:#{#menu.getName}, ''), e.name), " +
            "e.link=COALESCE(NULLIF(:#{#menu.getLink}, ''), e.link), " +
            "e.role=COALESCE(NULLIF(:#{#menu.getRole}, ''), e.role), " +
            "e.updated_by=COALESCE(NULLIF(:#{#menu.getUpdated_by}, ''), " +
            "e.updated_by) WHERE e.id=:#{#menu.getId}", nativeQuery = true)
    Integer editMenu(@Param("menu") MenuModel menu);

    @Query(value = "SELECT * FROM sidebar_menus WHERE sidebar_menus.role=:role", nativeQuery = true)
    List<MenuModel> getMenuByRole(@Param("role") String role);

}
