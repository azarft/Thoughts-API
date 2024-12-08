package kg.alatoo.thoughts_api.services.crud;

import kg.alatoo.thoughts_api.dto.EntryDTO;

import java.util.List;

public interface EntryService {
    List<EntryDTO> findAllEntries();
    EntryDTO findEntryById(Long id);
    EntryDTO saveEntry(EntryDTO dto);
    void deleteEntry(Long id);
    List<EntryDTO> findUsersEntries();
    void deleteEntryById(Long id);
    EntryDTO findUsersEntryById(Long id);
    EntryDTO updateEntry(Long id, EntryDTO dto);
}
