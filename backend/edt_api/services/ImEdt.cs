using System.Runtime.InteropServices;
using AutoMapper;
using edt_api.config;
using edt_api.dtos;
using edt_api.models;
using Microsoft.EntityFrameworkCore;

namespace edt_api.services;

public class ImEdt : IEdt
{

    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public ImEdt(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<EdtDto>> GetAllAsync()
    {
        var mat = await _db.Edts
            .AsNoTracking()
            .Include(e => e.enseignant)
            .Include(a => a.matiere)
            .Include(m => m.mention)
            .Include(n => n.niveau)
            .Include(s => s.salle)
            .ToListAsync();
        return _mapper.Map<IEnumerable<EdtDto>>(mat);
    }

    public async Task<EdtDto?> GetByIdAsync(string id)
    {
       var res = await _db.Edts.FindAsync(id);
       return res ==  null ? null : _mapper.Map<EdtDto>(res);
    }
    
    public async Task<bool> CheckConflitAsync(CreateEdtDto dto)
    {
        var conflit = await _db.Edts
            .Where(e => e.jour == dto.jour)
            .Where(e =>
                // Vérifie le chevauchement de temps
                (e.hDeb < dto.hFin && e.hFin > dto.hDeb)
                &&
                (
                    // Même enseignant
                    e.enseignantId == dto.enseignantId ||
                    // Même salle
                    e.salleId == dto.idSalle
                    // Tu peux ajouter d'autres contraintes ici si besoin
                )
            )
            .FirstOrDefaultAsync();

        return conflit != null;
    }

    public async Task<EdtDto> AddAsync(CreateEdtDto dto)
    {
        
        var conflict = await CheckConflitAsync(dto);
        if (conflict)
        {
            throw new InvalidOperationException("Chevuachement detecte: la salle ou l'enseignant est déjà occupé.");
        }
        
        var mat = new Edt
        {
            jour = dto.jour,
            hDeb = dto.hDeb,
            hFin = dto.hFin,
            disponibilite = dto.dispo,
            type = dto.type,
            responsableId = dto.responsableId,
            salleId = dto.idSalle,
            mentionId = dto.mentionId,
            niveauId = dto.niveauId,
            matiereId = dto.matiereId,
            enseignantId = dto.enseignantId
        };
        
        _db.Edts.Add(mat);
        await _db.SaveChangesAsync();
        return _mapper.Map<EdtDto>(mat);
    }

    public async Task<bool> UpdateAsync(string id, UpdateEdtDto dto)
    {
        var res = await _db.Edts.FindAsync(id);
        if (res == null) return false;
        
        _mapper.Map(dto, res);
        // res.nomMat = dto.nomMat;
        // res.nbHor = dto.nbH;
        // res.coefficient = dto.coeff;
        // res.mentionId = dto.mentionId;
        // res.niveauId = dto.nivId;
        // res.enseignantCode = dto.codeEns;
        
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var res =  await _db.Edts.FindAsync(id);
        if (res == null) return false;
        _db.Edts.Remove(res);
        await _db.SaveChangesAsync();
        return true;
    }

}