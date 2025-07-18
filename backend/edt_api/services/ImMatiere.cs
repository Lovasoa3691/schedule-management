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
            .Include(m => m.mention)
            .Include(n => n.niveau)
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
        var mat = new Matiere
        {
            nomMat = dto.nomMat,
            nbHor = dto.nbH,
            coefficient = dto.coeff,
            mentionId = dto.mentionId,
            niveauId = dto.nivId,
            enseignantId = dto.enseignantId
        };
        
        _db.Matieres.Add(mat);
        await _db.SaveChangesAsync();
        return _mapper.Map<MatiereDto>(mat);
    }

    public async Task<bool> UpdateAsync(string id, UpdateMatiereDto dto)
    {
        var res = await _db.Matieres.FindAsync(id);
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
        var res =  await _db.Matieres.FindAsync(id);
        if (res == null) return false;
        _db.Matieres.Remove(res);
        await _db.SaveChangesAsync();
        return true;
    }
}