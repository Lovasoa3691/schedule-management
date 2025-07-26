using System.Runtime.InteropServices;
using AutoMapper;
using edt_api.config;
using edt_api.dtos;
using edt_api.models;
using Microsoft.EntityFrameworkCore;

namespace edt_api.services;

public class ImMatiere : IMatiere
{

    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public ImMatiere(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<MatiereDto>> GetAllAsync()
    {
        var mat = await _db.Matieres
            .AsNoTracking()
            .Include(e => e.enseignant)
            .Include(m => m.matiereMention)
                .ThenInclude(mm => mm.mention)
            .Include(n => n.matiereNiveau)
                .ThenInclude(n => n.niveau)
            .ToListAsync();
        return _mapper.Map<IEnumerable<MatiereDto>>(mat);
    }

    public async Task<MatiereDto?> GetByIdAsync(string id)
    {
       var res = await _db.Matieres.FindAsync(id);
       return res ==  null ? null : _mapper.Map<MatiereDto>(res);
    }

    public async Task<MatiereDto> AddAsync(CreateMatiereDto dto)
    {
        var res = _mapper.Map<Matiere>(dto);
        await _db.Matieres.AddAsync(res);
        await _db.SaveChangesAsync();

        foreach (var mentionId in dto.mentionId)
        {
            var matMention = new MatiereMention
            {
                matiereId = res.codeMat,
                mentionId = mentionId
            };
            _db.MatiereMentions.Add(matMention);
        }
        
        foreach (var niveauId in dto.niveauId)
        {
            var matNiveau = new MatiereNiveau
            {
                matiereId = res.codeMat,
                niveauId = niveauId
            };
            _db.MatiereNiveaux.Add(matNiveau);
        }
        await _db.SaveChangesAsync();
        return _mapper.Map<MatiereDto>(res);
    }

    public async Task<bool> UpdateAsync(string id, UpdateMatiereDto dto)
    {
        var res = await _db.Matieres.FindAsync(id);
        if (res == null) return false;
        
        _mapper.Map(dto, res);
        
        await _db.SaveChangesAsync();
        return true;
    }
    
    // public async Task<bool> UpdateAsync(string id, UpdateMatiereDto dto)
    // {
    //     var matiere = await _db.Matieres
    //         .Include(m => m.matiereMention)
    //         .Include(m => m.matiereNiveau)
    //         .FirstOrDefaultAsync(m => m.id == id);
    //
    //     if (matiere == null) return false;
    //
    //     // Mise à jour des propriétés simples
    //     matiere.nomMat = dto.nomMat;
    //     matiere.nbH = dto.nbH;
    //     matiere.coeff = dto.coeff;
    //     matiere.EnseignantId = dto.enseignantId;
    //
    //     // ⚠️ Mise à jour des relations avec Mention
    //     matiere.Mentions.Clear();
    //     var newMentions = await _db.Mentions
    //         .Where(m => dto.mentionsIds.Contains(m.Id))
    //         .ToListAsync();
    //     foreach (var mention in newMentions)
    //     {
    //         matiere.Mentions.Add(mention);
    //     }
    //
    //     // ⚠️ Mise à jour des relations avec Niveau
    //     matiere.Niveaux.Clear();
    //     var newNiveaux = await _db.Niveaux
    //         .Where(n => dto.niveauxIds.Contains(n.Id))
    //         .ToListAsync();
    //     foreach (var niveau in newNiveaux)
    //     {
    //         matiere.Niveaux.Add(niveau);
    //     }
    //
    //     await _db.SaveChangesAsync();
    //     return true;
    // }


    public async Task<bool> DeleteAsync(string id)
    {
        var res =  await _db.Matieres.FindAsync(id);
        if (res == null) return false;
        _db.Matieres.Remove(res);
        await _db.SaveChangesAsync();
        return true;
    }
}