package main.gourmet.Repository.ItemPackageRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.gourmet.Entity.ItemsPackages.Item;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
