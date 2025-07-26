using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace edt_api.models;

public class Responsable: Utilisateur
{
    public string fonction { get; set; } = string.Empty;
    
    public ICollection<Edt> edts { get; set; } = new List<Edt>();
    public ICollection<Message> messages { get; set; } = new List<Message>();
    public ICollection<CalendrierAcademique> calendrierAcademies { get; set; } = new List<CalendrierAcademique>();
}