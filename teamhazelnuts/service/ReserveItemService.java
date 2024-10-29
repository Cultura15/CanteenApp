package com.g2appdev.teamhazelnuts.service;

import com.g2appdev.teamhazelnuts.entity.ReserveItem;
import com.g2appdev.teamhazelnuts.repository.ReserveItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReserveItemService {

    @Autowired
    ReserveItemRepository reserveItemRepository;

    public ReserveItem createReserveItem(ReserveItem reserveItem) {
        return reserveItemRepository.save(reserveItem);
    }

    public List<ReserveItem> getAllReserveItems() {
        return reserveItemRepository.findAll();
    }

    public ReserveItem updateReserveItem(int id, ReserveItem reserveItemDetails) {
        ReserveItem reserveItem = reserveItemRepository.findById(id).orElseThrow();
        reserveItem.setUserID(reserveItemDetails.getUserID());
        reserveItem.setMenuItemID(reserveItemDetails.getMenuItemID());
        reserveItem.setReservedQuantity(reserveItemDetails.getReservedQuantity());
        reserveItem.setPickupTime(reserveItemDetails.getPickupTime());
        return reserveItemRepository.save(reserveItem);
    }

    public void deleteReserveItem(int id) {
        reserveItemRepository.deleteById(id);
    }
}
