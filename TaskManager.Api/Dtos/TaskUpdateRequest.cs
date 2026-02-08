namespace TaskManager.Api.Dtos;

public record TaskUpdateRequest(string Title, string? Description, bool IsCompleted);
