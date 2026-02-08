namespace TaskManager.Api.Dtos;

public record TaskResponse(int Id, string Title, string? Description, bool IsCompleted);
