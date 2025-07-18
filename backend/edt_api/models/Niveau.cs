using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace edt_api.models;

public class Niveau
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int idNiv { get; set; }
    public string intitule { get; set; } = string.Empty;
    
    public ICollection<Matiere> matiere { get; set; } = new List<Matiere>();
    public ICollection<Edt> edts { get; set; } = new List<Edt>();
}