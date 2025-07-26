namespace edt_api.dtos;

public record EnseignantDto(string id, string nom, string prenom, string phone, string grade, string genre, string adresse, string email);
public record CreateEnseignantDto(string nom, string prenom, string phone, string grade, string genre, string adresse);
public record UpdateEnseignantDto(string nom, string prenom, string phone, string grade, string genre, string adresse);
public record RegisterEnseignantDto(string nom, string prenom, string phone, string grade, string email, string mdp);