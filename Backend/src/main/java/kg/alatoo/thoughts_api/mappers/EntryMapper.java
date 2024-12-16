package kg.alatoo.thoughts_api.mappers;


import kg.alatoo.thoughts_api.dto.EntryDTO;
import kg.alatoo.thoughts_api.entities.Entry;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface EntryMapper {

    @Mapping(source = "createdById", target = "createdBy.id")
    Entry entryDtoToEntry(EntryDTO dto);

    @Mapping(source = "createdBy.id", target = "createdById")
    EntryDTO entryToEntryDto(Entry entry);
}
