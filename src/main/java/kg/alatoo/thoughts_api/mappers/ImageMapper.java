package kg.alatoo.thoughts_api.mappers;

import kg.alatoo.thoughts_api.dto.ImageDTO;
import kg.alatoo.thoughts_api.entities.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ImageMapper {
    @Mapping(source = "belongsToId", target = "belongsTo.entryId")
    Image imageDtoImage(ImageDTO dto);

    @Mapping(source = "belongsTo.entryId", target = "belongsToId")
    ImageDTO imageToImageDto(Image image);
}
