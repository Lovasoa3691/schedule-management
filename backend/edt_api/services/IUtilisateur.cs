using edt_api.dtos;

namespace edt_api.services;

public interface IResponsable
{
    Task<IEnumerable<ResponsableDto>> getAllAsync();
    Task<ResponsableDto> getByIdAsync(string id);
    Task<ResponsableDto> createAsync(CreateResponsableDto dto);
    Task<ResponsableDto> registerAsync(RegisterResponsableDto dto);
    Task<bool> updateAsync(string id, UpdateResponsableDto dto);
    Task<bool> deleteAsync(string id);
}