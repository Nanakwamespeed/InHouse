package com.customs.exchangerate;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

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

}
