package kg.alatoo.thoughts_api.services.crud.iml;

import kg.alatoo.thoughts_api.dto.EntryDTO;
import kg.alatoo.thoughts_api.entities.Entry;
import kg.alatoo.thoughts_api.entities.User;
import kg.alatoo.thoughts_api.exceptions.ApiException;
import kg.alatoo.thoughts_api.mappers.EntryMapper;
import kg.alatoo.thoughts_api.repositories.EntryRepository;
import kg.alatoo.thoughts_api.repositories.UserRepository;
import kg.alatoo.thoughts_api.services.crud.FavouriteService;
import kg.alatoo.thoughts_api.services.crud.UserService;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavouriteServiceJPA implements FavouriteService {
    private final UserService userService;
    private final EntryMapper entryMapper;
    private final EntryRepository entryRepository;
    private final UserRepository userRepository;

    public FavouriteServiceJPA(UserService userService, EntryMapper entryMapper, EntryRepository entryRepository, UserRepository userRepository) {
        this.userService = userService;
        this.entryMapper = entryMapper;
        this.entryRepository = entryRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<EntryDTO> getUsersFavouriteEntries() {
        User currentUser = userService.getCurrentUser();
        List<Entry> entries = new ArrayList<>(currentUser.getFavorites());
        return entries.stream()
                .map(entryMapper::entryToEntryDto)
                .collect(Collectors.toList());
    }

    @Override
    public EntryDTO setFavouriteEntry(Long id) {
        User user = userService.getCurrentUser();
        Optional<Entry> optionalEntry = entryRepository.findByEntryIdAndCreatedById(id, user.getId());
        Entry entry = optionalEntry.orElseThrow(() -> new ApiException("Entry not found with id: " + id, HttpStatusCode.valueOf(409)));
        user.getFavorites().add(entry);
        userRepository.save(user);
        return entryMapper.entryToEntryDto(entry);
    }

    @Override
    public EntryDTO deleteFavouriteEntry(Long id) {
        // Get the current user
        User user = userService.getCurrentUser();

        // Find the entry in the user's favorites
        Optional<Entry> optionalEntry = user.getFavorites().stream()
                .filter(entry -> entry.getEntryId().equals(id))
                .findFirst();

        // If the entry is not in the user's favorites, throw an exception
        Entry entry = optionalEntry.orElseThrow(() -> new ApiException(
                "Favorite entry not found with id: " + id, HttpStatusCode.valueOf(404)));

        // Remove the entry from the user's favorites
        user.getFavorites().remove(entry);

        // Save the updated user
        userRepository.save(user);

        // Return the entry as a DTO
        return entryMapper.entryToEntryDto(entry);
    }



}
