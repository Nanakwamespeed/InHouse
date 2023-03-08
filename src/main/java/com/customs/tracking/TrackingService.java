package com.customs.tracking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackingService {

    @Autowired
    private TrackingRepository repo;

    public List<TrackingModel> getTracking(){
        return (List<TrackingModel>) repo.findAll();
    }
    public TrackingModel addTracking(TrackingModel tracking){
        return repo.save(tracking);
    }

}
