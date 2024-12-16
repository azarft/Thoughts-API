package kg.alatoo.thoughts_api.services.crud;

import kg.alatoo.thoughts_api.dto.EntryDTO;
import kg.alatoo.thoughts_api.entities.Entry;
import kg.alatoo.thoughts_api.entities.User;
import kg.alatoo.thoughts_api.exceptions.ApiException;
import org.springframework.http.HttpStatusCode;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface FavouriteService {
    List<EntryDTO> getUsersFavouriteEntries();

    EntryDTO setFavouriteEntry(Long id);
    EntryDTO deleteFavouriteEntry(Long id);
}
