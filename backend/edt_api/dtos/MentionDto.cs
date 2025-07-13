namespace edt_api.dtos;

public record MentionDto(int id, string nomMention);
public record CreateMentionDto(string nomMention);
public record UpdateMentionDto(string nomMention);