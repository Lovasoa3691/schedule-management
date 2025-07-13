using System.ComponentModel.DataAnnotations;

namespace edt_api.models;

public class Edt
{
    [Key]public string numEd {get; set;} = Guid.NewGuid().ToString();
    public string jour {get; set;} = string.Empty;
    public TimeOnly hDeb{get; set;}
    public TimeOnly hFin{get; set;}
    
    public string responsableId { get; set; }
    public Responsable responsable { get; set; }
    
    public int salleId {get; set;}
    public Salle salle{get; set;}
    
    public ICollection<Mention> mentions {get; set;} = new List<Mention>();
}