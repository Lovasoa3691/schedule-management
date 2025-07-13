using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace edt_api.models;

public class Niveau
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int idNiv { get; set; }
    public string intitule { get; set; } = string.Empty;
    
    public int mentionId { get; set; }
    public Mention mention{get; set;} =  null;
    
    public ICollection<Matiere> matiere { get; set; } = new List<Matiere>();
}