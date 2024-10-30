//package com.g2appdev.register.Register.initializer;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import com.g2appdev.register.Register.entity.MenuEntity;
//import com.g2appdev.register.Register.entity.RegisterEntity;
//import com.g2appdev.register.Register.repository.MenuRepository;
//import com.g2appdev.register.Register.repository.RegisterRepository;
//
//import jakarta.annotation.PostConstruct;
//
//@Component
//public class DataInitializer {
//
//    @Autowired
//    private MenuRepository menuRepository;
//
//    @Autowired
//    private RegisterRepository registerRepository;
//
//    @PostConstruct
//    public void init() {
//        // Fetch the user you want to associate with the menu items, using their user_id
//        RegisterEntity user = registerRepository.findById(1) // Change this ID as appropriate
//            .orElseThrow(() -> new RuntimeException("User not found for initialization"));
//
//        // Add sample food items linked to the user
//        menuRepository.saveAll(List.of(
////            new MenuEntity("SunnySideUp Egg", "Farm fresh egg", 15.00, "Breakfast", "path/to/banana.jpg", user),
////            new MenuEntity("HotDog", "Virginia Hotdog", 30.00, "Breakfast", "path/to/hotdog.jpg", user),
////            new MenuEntity("Example", "Example", 30.00, "Example", "path/to/Example.jpg", user)
//        ));
//    }
//}