using System.ComponentModel.DataAnnotations;

namespace edt_api.models;

public class Authentification
{
    [Key]
    public string idAuth{get;set;} = Guid.NewGuid().ToString();
    public string email{get;set;} = string.Empty;
    public string mdp{get;set;} = string.Empty;

    public string utilisateurId { get; set; } = null!;
    public Utilisateur utilisateur{get;set;}
}