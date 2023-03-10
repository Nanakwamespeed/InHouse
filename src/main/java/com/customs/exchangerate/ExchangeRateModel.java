package com.customs.exchangerate;

import jakarta.persistence.*;

import java.sql.Timestamp;

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
    private Timestamp first_created;
    private Integer updated_by;
    private Timestamp last_updated;
    private String country_code;


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

    public Timestamp getFirst_created() {
        return first_created;
    }

    public void setFirst_created(Timestamp first_created) {
        this.first_created = first_created;
    }

    public Integer getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(Integer updated_by) {
        this.updated_by = updated_by;
    }

    public Timestamp getLast_updated() {
        return last_updated;
    }

    public void setLast_updated(Timestamp last_updated) {
        this.last_updated = last_updated;
    }

    public String getCountry_code() {
        return country_code;
    }

    public void setCountry_code(String country_code) {
        this.country_code = country_code;
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
                ", first_created=" + first_created +
                ", updated_by=" + updated_by +
                ", last_updated=" + last_updated +
                ", country_code='" + country_code + '\'' +
                '}';
    }
}
