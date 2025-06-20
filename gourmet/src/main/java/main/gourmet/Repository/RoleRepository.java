package main.gourmet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import main.gourmet.Entity.ENUM.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role.RoleName name);
}