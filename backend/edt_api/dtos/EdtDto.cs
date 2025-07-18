namespace edt_api.dtos;

public record EdtDto(string numEd, DateOnly jour, TimeOnly hDeb, TimeOnly hFin, string dispo, string type, string nomSalle, string nomMatiere, string mention, string niveau, string nomEns, string prenomEns);
public record CreateEdtDto(DateOnly jour, TimeOnly hDeb, TimeOnly hFin, string dispo, string type, string responsableId, int idSalle, string enseignantId, int mentionId, int niveauId, string matiereId);
public record UpdateEdtDto(DateOnly jour, TimeOnly hDeb, TimeOnly hFin, string dispo, string type, string responsableId, int idSalle,  string enseignantId, int mentionId, int niveauId, string matiereId);