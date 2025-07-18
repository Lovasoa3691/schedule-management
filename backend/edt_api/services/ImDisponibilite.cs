using AutoMapper;
using edt_api.config;
using edt_api.dtos;
using edt_api.models;
using Microsoft.EntityFrameworkCore;

namespace edt_api.services;

public class ImDisponibilite : IDisponibilite
{
    
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public ImDisponibilite(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<DispoDto>> GetAllAsync()
    {
        var dispo = await _db.Disponibilites
            .Include(e => e.enseignant)
            .ToListAsync();
        return _mapper.Map<IEnumerable<DispoDto>>(dispo);
    }

    public async Task<DispoDto?> GetByIdAsync(string id)
    {
        var res =  await _db.Disponibilites.FindAsync(id);
        return res == null ? null : _mapper.Map<DispoDto>(res);
    }

    public async Task<DispoDto> CreateAsync(CreateDispoDto dto)
    {
        var data = new Disponibilite
        {
            dateDispo = dto.dateDispo,
            hDeb = dto.hDeb,
            hFin = dto.hFin,
            enseignantId = dto.codeEns
        };
        
        _db.Disponibilites.Add(data);
        await _db.SaveChangesAsync();
        return _mapper.Map<DispoDto>(data);
    }

    public async Task<bool> UpdateAsync(string id, UpdateDispoDto dto)
    {
        var res  = await _db.Disponibilites.FindAsync(id);
        if (res == null) return false;
        
        res.dateDispo = dto.dateDispo;
        res.hDeb = dto.hDeb;
        res.hFin = dto.hFin;
        res.enseignantId = dto.codeEns;
        _db.Disponibilites.Update(res);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var  res = await _db.Disponibilites.FindAsync(id);
        if (res == null) return false;
        _db.Disponibilites.Remove(res);
        await _db.SaveChangesAsync();
        return true;
    }
}