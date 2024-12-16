package kg.alatoo.thoughts_api.services.crud;

import kg.alatoo.thoughts_api.dto.ImageDTO;
import kg.alatoo.thoughts_api.entities.Entry;
import kg.alatoo.thoughts_api.entities.Image;
import kg.alatoo.thoughts_api.entities.User;
import kg.alatoo.thoughts_api.exceptions.ApiException;
import org.springframework.http.HttpStatusCode;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface ImageService {
    ImageDTO saveImageToEntry(Long id, MultipartFile file) throws IOException;

    ImageDTO saveImageToUser(MultipartFile file) throws IOException;

    MultipartFile getImage(Long imageId) throws IOException;

    MultipartFile getProfileImage() throws IOException;

    List<ImageDTO> getAllImagesOfEntry(Long id);

    void deleteProfileImageOfUser();
}
