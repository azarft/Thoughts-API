package kg.alatoo.thoughts_api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import kg.alatoo.thoughts_api.enums.Role;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "password_hash")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime created_at;
}
