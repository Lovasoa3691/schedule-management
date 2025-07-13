namespace edt_api.dtos;

public record SalleDto(int idsalle, string nomsalle, int capacite, string typeSalle);
public record CreateSalleDto(string nomsalle, int capacite, string typeSalle);
public record UpdateSalleDto(string nomsalle, int capacite, string typeSalle);