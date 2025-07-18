namespace edt_api.dtos;

public record EnseignantDto(string id, string nom, string prenom, string phone, string grade);
public record CreateEnseignantDto(string nom, string prenom, string phone, string grade);
public record UpdateEnseignantDto(string nom, string prenom, string phone, string grade);
public record RegisterEnseignantDto(string nom, string prenom, string phone, string grade, string email, string mdp);