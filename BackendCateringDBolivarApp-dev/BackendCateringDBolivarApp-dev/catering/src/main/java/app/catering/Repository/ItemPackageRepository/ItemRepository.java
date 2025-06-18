package app.catering.Repository.ItemPackageRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.catering.Entity.ItemsPackages.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
