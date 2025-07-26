using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace edt_api.models;

public class AnneeScolaire
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int idAnnee{get;set;}
    public DateOnly dateDebutAnnee {get;set;}
    public DateOnly dateFinAnnee {get;set;}
    
    public ICollection<Edt> edts { get; set; } = new List<Edt>();
}