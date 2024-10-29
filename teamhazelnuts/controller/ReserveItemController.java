package com.g2appdev.teamhazelnuts.controller;

import com.g2appdev.teamhazelnuts.entity.ReserveItem;
import com.g2appdev.teamhazelnuts.service.ReserveItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3002")
@RequestMapping("/api/reserveItem")
public class ReserveItemController {

    @Autowired
    ReserveItemService reserveItemService;

    @PostMapping("/create")
    public ReserveItem createReserveItem(@RequestBody ReserveItem reserveItem) {
        return reserveItemService.createReserveItem(reserveItem);
    }


    @GetMapping("/getAll")
    public List<ReserveItem> getAllReserveItems() {
        return reserveItemService.getAllReserveItems();
    }

    @PutMapping("/update/{id}")
    public ReserveItem updateReserveItem(@PathVariable int id, @RequestBody ReserveItem reserveItemDetails) {
        return reserveItemService.updateReserveItem(id, reserveItemDetails);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReserveItem(@PathVariable int id) {
        reserveItemService.deleteReserveItem(id);
    }
}
