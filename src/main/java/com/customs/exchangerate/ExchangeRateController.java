package com.customs.exchangerate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rates")
public class ExchangeRateController {

    @Autowired
    private ExchangeRateService service;

    @GetMapping("/get-all")
    public List<ExchangeRateModel> getRateList() {
        return service.getRates();
    }

}
