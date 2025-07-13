using System.ComponentModel.DataAnnotations;

namespace edt_api.models;

public class Matiere
{
    [Key] public string codeMat { get; set; } = Guid.NewGuid().ToString();
    public string nomMat { get; set; } = string.Empty;
    public int nbHor { get; set; }
    public int coefficient{ get; set; }
    
    public string? enseignantCode {get; set;}
    public Enseignant? enseignant{get; set;}
    
    public int niveauId { get; set; }
    public Niveau niveau{get; set;} =  null;
    
    public int mentionId { get; set; }
    public Mention mention{get; set;} =  null;
}