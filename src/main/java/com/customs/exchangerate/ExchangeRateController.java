package com.customs.exchangerate;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping("/upload")
    public Integer handleFileUpload(@Param("file") MultipartFile file) {
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                String flag = row.getCell(0).getStringCellValue();
                String country = row.getCell(1).getStringCellValue();
                float selling = (float) row.getCell(2).getNumericCellValue();
                float buying = (float) row.getCell(3).getNumericCellValue();

                Integer response = service.handleFileUpload(flag, country, selling, buying);
                System.out.println(response);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return 1;
    }

}
