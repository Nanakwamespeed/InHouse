package com.customs.exchangerate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExchangeRateService {

    @Autowired
    private ExchangeRateRepository repo;

    public List<ExchangeRateModel> getRates() {
        return (List<ExchangeRateModel>) repo.findAll();
    }
}
