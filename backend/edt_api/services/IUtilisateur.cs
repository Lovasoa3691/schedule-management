using edt_api.dtos;

namespace edt_api.services;

public interface IUtilisateur
{
    Task<IEnumerable<ResponsableDto>> getAllAsync();
    Task<ResponsableDto> getByIdAsync(string id);
    Task<ResponsableDto> createAsync(CreateResponsableDto dto);
    Task<EnseignantDto> registerAsync(RegisterEnseignantDto dto);
    Task<bool> updateAsync(string id, UpdateResponsableDto dto);
    Task<bool> deleteAsync(string id);
}