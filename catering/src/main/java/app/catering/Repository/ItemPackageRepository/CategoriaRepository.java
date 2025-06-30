package app.catering.Repository.ItemPackageRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.catering.Entity.ItemsPackages.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
