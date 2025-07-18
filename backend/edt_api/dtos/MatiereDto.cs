namespace edt_api.dtos;

public record MatiereDto(string id, string nomMat, int nbH, int coeff, string nomEns, string prenomEns, string mention, string niveau);
public record CreateMatiereDto( string nomMat, int nbH, int coeff, string enseignantId,int mentionId, int nivId);
public record UpdateMatiereDto(string nomMat, int nbH, int coeff, string enseignantId,int mentionId, int nivId);