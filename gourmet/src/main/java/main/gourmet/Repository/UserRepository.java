package main.gourmet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import main.gourmet.Entity.User;
import main.gourmet.Entity.ENUM.Role;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String verificationCode);
    boolean existsByEmail(String email);

      // New method: Count users who have a specific Role entity
    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r = :role")
    long countByRolesContaining(@Param("role") Role role);
}