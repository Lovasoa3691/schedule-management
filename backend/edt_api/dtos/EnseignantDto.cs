namespace edt_api.dtos;

public record ResponsableDto(string id, string nom, string prenom, string phone, string fonction);
public record CreateResponsableDto(string nom, string prenom, string phone, string fonction);
public record UpdateResponsableDto(string nom, string prenom, string phone, string fonction);

public record RegisterResponsableDto(string nom, string prenom, string phone, string fonction, string email, string mdp);