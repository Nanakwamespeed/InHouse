package com.customs.exchangerate;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;

public interface ExchangeRateRepository extends CrudRepository<ExchangeRateModel, Integer> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE exchange_rate e " +
            "SET  e.flag=COALESCE(NULLIF(:#{#exchange.getFlag()}, ''), e.flag), " +
            "e.country=COALESCE(NULLIF(:#{#exchange.getCountry()}, ''), e.country), " +
            "e.selling=COALESCE(NULLIF(:#{#exchange.getSelling()}, ''), e.selling), " +
            "e.country_code=COALESCE(NULLIF(:#{#exchange.getCountry_code()}, ''), e.country_code), " +
            "e.last_updated=COALESCE(NULLIF(:#{#exchange.getLast_updated()}, ''), e.last_updated), " +
            "e.updated_by=COALESCE(NULLIF(:#{#exchange.getUpdated_by()}, ''), e.updated_by), " +
            "e.buying=COALESCE(NULLIF(:#{#exchange.getBuying()}, ''), " +
            "e.buying) WHERE e.id=:#{#exchange.getId}", nativeQuery = true)
    Integer editExchangeRate(@Param("exchange") ExchangeRateModel exchange);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO exchange_rate (flag, country, selling, buying, created_by, country_code, first_updated) " +
            "VALUES (:flag, :country, :selling, :buying, '1', :country_code, :first_updated)", nativeQuery = true)
    int uploadRates(@Param("flag") String flag, @Param("country") String country,
                    @Param("selling") Float selling, @Param("buying") Float buying,
                    @Param("first_updated") Timestamp first_updated,
                    @Param("country_code") String country_code);


}
