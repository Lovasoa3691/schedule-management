using System.ComponentModel.DataAnnotations;

namespace edt_api.models;

public class Edt
{
    [Key]public string numEd {get; set;} = Guid.NewGuid().ToString();
    public DateOnly jour {get; set;}
    public TimeOnly hDeb{get; set;}
    public TimeOnly hFin{get; set;}
    public string type {get; set;}
    public string disponibilite {get; set;} = string.Empty;
    public string semaine {get; set;} = string.Empty;
    
    public string responsableId { get; set; }
    public Responsable responsable { get; set; }
    
    public int salleId {get; set;}
    public Salle salle{get; set;}
    
    public string enseignantId {get; set;} = string.Empty;
    public Enseignant enseignant{get; set;}
    
    public string matiereId {get; set;} = string.Empty;
    public Matiere matiere { get; set; }
    
    public int mentionId {get; set;}
    public Mention mention{get; set;}
    
    public int niveauId {get; set;}
    public Niveau niveau{get; set;}
    
    public int anneeId {get; set;}
    public AnneeScolaire anneeScolaire{get; set;}
}