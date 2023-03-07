package com.customs.user;

import com.customs.menu.MenuModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends CrudRepository<UserModel, Integer> {

    @Query(value = "SELECT * FROM customs.users WHERE users.email=:email AND users.password=:password", nativeQuery = true)
     List<UserModel> findByEmail(@Param("email") String email, @Param("password") String password);

    @Query(value = "SELECT theme FROM customs.users WHERE users.id=:id", nativeQuery = true)
    List<String> getThemeById(@Param("id") int id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE users e " +
            "SET  e.user_name=COALESCE(NULLIF(:#{#user.getUser_name}, ''), e.user_name), " +
            "e.first_name=COALESCE(NULLIF(:#{#user.getFirst_name}, ''), e.first_name), " +
            "e.last_name=COALESCE(NULLIF(:#{#user.getLast_name}, ''), e.last_name), " +
            "e.role=COALESCE(NULLIF(:#{#user.getRole}, ''), e.role), " +
            "e.updated_by=COALESCE(NULLIF(:#{#user.getUpdated_by}, ''), e.updated_by), " +
            "e.email=COALESCE(NULLIF(:#{#user.getEmail}, ''), e.email), " +
            "e.theme=COALESCE(NULLIF(:#{#user.getTheme}, ''), e.theme) " +
            "WHERE e.id=:#{#user.getId}", nativeQuery = true)
    Integer editUser(@Param("user") UserModel user);

}
