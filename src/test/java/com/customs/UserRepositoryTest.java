package com.customs;

import com.customs.user.UserModel;
import com.customs.user.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.util.Assert;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepositoryTest {
    @Autowired private UserRepository repo;

    @Test
    public void testAddNew() {
        UserModel user = new UserModel();
        user.setUser_name("SupremoEdwin");
        user.setFirst_name("Edwin");
        user.setLast_name("Supremo");
        user.setEmail("supremo@gmail.com");
        user.setPassword("eddie6");
        user.setCreated_by(1);
        user.setRole("admin");
        user.setTheme("red");

        UserModel savedUser = repo.save(user);

        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.getId()).isGreaterThan(0);
    }

    @Test
    public void testGetUserByEmail() {

        List<UserModel> savedUser = repo.findByEmail("supremo@gmail.com", "eddie6");

        Assertions.assertThat(savedUser).isNotNull();
//        Assertions.assertThat(savedUser.getId()).isGreaterThan(0);
        System.out.println(savedUser);
    }
}
