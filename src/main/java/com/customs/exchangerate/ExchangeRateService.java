package com.customs.exchangerate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ExchangeRateService {

    @Autowired
    private ExchangeRateRepository repo;

    public List<ExchangeRateModel> getRates() {
        return (List<ExchangeRateModel>) repo.findAll();
    }

    public Integer handleFileUpload(String flag, String country, Float selling, Float buying, String country_code,
                                    Timestamp first_updated){
        return repo.uploadRates(flag, country, selling, buying, first_updated, country_code);
    }
}
