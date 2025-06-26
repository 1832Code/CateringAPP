package app.catering.Repository;

import app.catering.Entity.User.Role;
import app.catering.Entity.User.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(RoleName name);

}
