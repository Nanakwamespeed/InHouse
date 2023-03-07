package com.customs.exchangerate;

import jakarta.persistence.*;

@Entity
@Table(name="exchange_rate")
public class ExchangeRateModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String flag;
    private String country;
    private Float selling;
    private Float buying;
    private Integer created_by;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Float getSelling() {
        return selling;
    }

    public void setSelling(Float selling) {
        this.selling = selling;
    }

    public Float getBuying() {
        return buying;
    }

    public void setBuying(Float buying) {
        this.buying = buying;
    }

    public Integer getCreated_by() {
        return created_by;
    }

    public void setCreated_by(Integer created_by) {
        this.created_by = created_by;
    }

    @Override
    public String toString() {
        return "ExchangeRateModel{" +
                "id=" + id +
                ", flag='" + flag + '\'' +
                ", country='" + country + '\'' +
                ", selling=" + selling +
                ", buying=" + buying +
                ", created_by=" + created_by +
                '}';
    }
}
