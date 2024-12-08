package kg.alatoo.thoughts_api.repositories;

import kg.alatoo.thoughts_api.entities.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    boolean existsByEntryIdAndCreatedById(Long id, Long userId);
    List<Entry> findByCreatedById(Long userId);
    Optional<Entry> findByEntryIdAndCreatedById(Long id, Long userId);

}
