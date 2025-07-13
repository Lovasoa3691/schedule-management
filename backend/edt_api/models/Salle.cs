using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace edt_api.models;

public class Salle
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int idSalle { get; set; }
    public string nomSalle { get; set; } = string.Empty;
    public int capacite {get; set;}
    public string typeSalle { get; set; } = string.Empty;
    
    public ICollection<Edt> edts { get; set; } = new List<Edt>();
}