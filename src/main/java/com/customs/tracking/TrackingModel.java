package com.customs.tracking;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "tracking")
public class TrackingModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private String icon;
    private String icon_name;
    private Integer created_by;
    private Timestamp first_created;
    private Integer updated_by;
    private Timestamp last_updated;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getIcon_name() {
        return icon_name;
    }

    public void setIcon_name(String icon_name) {
        this.icon_name = icon_name;
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

    @Override
    public String toString() {
        return "TrackingModel{" +
                "id=" + id +
                ", icon='" + icon + '\'' +
                ", icon_name='" + icon_name + '\'' +
                ", created_by=" + created_by +
                ", first_created='" + first_created + '\'' +
                ", updated_by=" + updated_by +
                ", last_updated='" + last_updated + '\'' +
                '}';
    }
}
