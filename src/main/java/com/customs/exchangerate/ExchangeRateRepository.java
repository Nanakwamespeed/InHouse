package com.customs.exchangerate;

import com.customs.menu.MenuModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ExchangeRateRepository extends CrudRepository<ExchangeRateModel, Integer> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE exchange_rate e " +
            "SET  e.flag=COALESCE(NULLIF(:#{#exchange.getFlag()}, ''), e.flag), " +
            "e.country=COALESCE(NULLIF(:#{#exchange.getCountry()}, ''), e.country), " +
            "e.selling=COALESCE(NULLIF(:#{#exchange.getSelling()}, ''), e.selling), " +
            "e.buying=COALESCE(NULLIF(:#{#exchange.getBuying()}, ''), " +
            "e.buying) WHERE e.id=:#{#exchange.getId}", nativeQuery = true)
    Integer editExchangeRate(@Param("exchange") ExchangeRateModel exchange);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO exchange_rate (flag, country, selling, buying, created_by) " +
            "VALUES (:flag, :country, :selling, :buying, '1')", nativeQuery = true)
    int uploadRates(@Param("flag") String flag, @Param("country") String country,
                    @Param("selling") Float selling, @Param("buying") Float buying);


}
