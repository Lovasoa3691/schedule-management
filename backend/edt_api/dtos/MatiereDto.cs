namespace edt_api.dtos;

public record MatiereDto(string id, string nomMat, int nbH, int coeff, string nomEns, string prenomEns, List<string> mention, List<string> niveau, List<int> mentionId, List<int> niveauId);
public record CreateMatiereDto( string nomMat, int nbH, int coeff, string enseignantId, List<int> mentionId, List<int> niveauId);
public record UpdateMatiereDto(string nomMat, int nbH, int coeff, string enseignantId,List<int> mentionId, List<int> niveauId);