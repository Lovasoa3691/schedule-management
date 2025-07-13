namespace edt_api.dtos;

public record NiveauDto(int id, string intitule, int mentionId);
public record CreateNiveauDto(string intitule, int mentionId);
public record UpdateNiveauDto(string intitule, int mentionId);