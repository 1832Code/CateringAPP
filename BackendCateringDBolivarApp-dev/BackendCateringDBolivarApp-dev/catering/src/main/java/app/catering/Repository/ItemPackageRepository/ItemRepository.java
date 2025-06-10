package app.catering.Repository.ItemPackageRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.catering.Users.ItemsPackages.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
