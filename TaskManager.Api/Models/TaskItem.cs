namespace TaskManager.Api.Models;

public class TaskItem
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsCompleted { get; set; }

    // Ownership
    public int UserId { get; set; }
    public User User { get; set; } = null!;
}
