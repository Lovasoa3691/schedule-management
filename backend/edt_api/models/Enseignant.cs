using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace edt_api.models;

public class Enseignant: Utilisateur
{
    public string grade { get; set; } = string.Empty;
    
    public ICollection<Disponibilite>  disponibilites { get; set; } = new List<Disponibilite>();
    public ICollection<Matiere>  matiere { get; set; } = new List<Matiere>();
    
}