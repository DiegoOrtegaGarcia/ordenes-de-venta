namespace MiProyectoMySQL.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    private bool IsAdmin { get; set; } = false;


    public void SetAdmin()
    {
        IsAdmin = true;
    }

}