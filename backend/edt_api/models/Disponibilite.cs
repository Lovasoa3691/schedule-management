using System.ComponentModel.DataAnnotations;

namespace edt_api.models;

public class Disponibilite
{
    [Key] public string numDispo {get; set;} = Guid.NewGuid().ToString();
    public DateOnly dateDispo{get; set;}
    public TimeOnly hDeb{get; set;}
    public TimeOnly hFin{get; set;}
    
    public string enseignantCode {get; set;}
    public Enseignant enseignant{get; set;}
}