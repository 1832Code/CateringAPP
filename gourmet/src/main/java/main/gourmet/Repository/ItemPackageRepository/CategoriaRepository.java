package main.gourmet.Repository.ItemPackageRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.gourmet.Entity.ItemsPackages.Categoria;


@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
