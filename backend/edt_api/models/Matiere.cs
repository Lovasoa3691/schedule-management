using System.ComponentModel.DataAnnotations;
using edt_api.dtos;

namespace edt_api.models;

public class Matiere
{
    [Key] public string codeMat { get; set; } = Guid.NewGuid().ToString();
    public string nomMat { get; set; } = string.Empty;
    public int nbHor { get; set; }
    public int coefficient{ get; set; }
    public string enseignantId {get; set;}
    public Enseignant enseignant{get; set;}
    
    
    public ICollection<Edt> edts { get; set; } = new List<Edt>();
    public ICollection<Enseignement> enseignements { get; set; } = new List<Enseignement>();
    public ICollection<MatiereMention> matiereMention { get; set; } = new List<MatiereMention>();
    public ICollection<MatiereNiveau>  matiereNiveau { get; set; } = new List<MatiereNiveau>();
}