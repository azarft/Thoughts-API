package kg.alatoo.thoughts_api.repositories;

import kg.alatoo.thoughts_api.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByBelongsToEntryId(Long id);
}
