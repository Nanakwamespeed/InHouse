package com.customs.tracking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("api/tracking")
public class TrackingController {

    @Autowired
    private TrackingService service;

    @GetMapping("/getAll")
    List<TrackingModel> getTrackingList(){
        return service.getTracking();
    }

    @GetMapping("/add-tracking")
    public TrackingModel addTracking(
            @RequestParam(value = "icon") String icon,
            @RequestParam(value = "icon_name") String icon_name,
            @RequestParam(value = "created_by")Integer created_by,
            @RequestParam(value = "first_created")Timestamp first_created
            ){
        TrackingModel tracking = new TrackingModel();
        tracking.setIcon(icon);
        tracking.setIcon_name(icon_name);
        tracking.setCreated_by(created_by);
        tracking.setFirst_created(first_created);
        return service.addTracking(tracking);
    }
}
