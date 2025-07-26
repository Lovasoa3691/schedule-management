using System.ComponentModel.DataAnnotations;

namespace edt_api.models;

public class Message
{
    [Key]
    public string idMes {get;set;} = new Guid().ToString();
    public DateTime dateMes {get;set;}
    public string texte {get;set;}
    public string statusMes {get;set;}
    
    public string enseignantId { get; set; }
    public Enseignant enseignant {get;set;}
    
    public string responsableId { get; set; }
    public Responsable responsable {get;set;}
}