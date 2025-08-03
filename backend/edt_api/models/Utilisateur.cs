using System.ComponentModel.DataAnnotations;

namespace edt_api.models;

public abstract class Utilisateur
{
    [Key]
    public string idUt{get;set;} = Guid.NewGuid().ToString();
    public string nom{get;set;} = string.Empty;
    public string prenom{get;set;} = string.Empty;
    public string telephone{get;set;}
    public string genre{get;set;}
    public string adresse{get;set;}
    
    public ICollection<Authentification> Authentifications{get;set;} = new List<Authentification>();
}