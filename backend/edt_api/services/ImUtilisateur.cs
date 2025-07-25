using edt_api.config;
using edt_api.dtos;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using edt_api.models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace edt_api.services;

public class ImUtilisateur : IUtilisateur
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;
    
    public ImUtilisateur(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<ResponsableDto>> getAllAsync()
    {
        var responsable = await _db.Responsables.Include(r => r.Authentifications).ToListAsync();
        return _mapper.Map<IEnumerable<ResponsableDto>>(responsable);
    }

    public async Task<IEnumerable<EnseignantDto>> getAllTeacherAsync()
    {
        var enseignant = await _db.Enseignants.Include(e => e.Authentifications).ToListAsync();
        return _mapper.Map<IEnumerable<EnseignantDto>>(enseignant);
    }

    public async Task<ResponsableDto?> getByIdAsync(string id)
    {
        var res = await _db.Responsables.FindAsync(id);
        return res == null ? null : _mapper.Map<ResponsableDto>(res);
    }

    public async Task<ResponsableDto> createAsync(CreateResponsableDto dto)
    {
        
        var res = new Responsable
        {
            nom = dto.nom,
            prenom = dto.prenom,
            telephone = dto.phone,
            fonction = dto.fonction,
        };
        
        _db.Responsables.Add(res);
        await _db.SaveChangesAsync();

        var hasher = new PasswordHasher<Utilisateur>();
        string hashedPass = hasher.HashPassword(res, dto.mdp);

        var auth = new Authentification
        {
            email = dto.email,
            mdp = hashedPass,
            utilisateurId = res.idUt
        };
        
        _db.Authentifications.Add(auth);
        await _db.SaveChangesAsync();

        return new ResponsableDto(
            res.idUt,
            res.nom,
            res.prenom,
            res.telephone,
            res.fonction,
            res.genre,
            res.adresse,
            auth.email
        );
    }
    
    public async Task<EnseignantDto> addAsync(CreateEnseignantDto dto)
    {
        
        var res = _mapper.Map<Enseignant>(dto);
        await _db.Enseignants.AddAsync(res);
        await _db.SaveChangesAsync();
        return _mapper.Map<EnseignantDto>(res);
    }

    public async Task<EnseignantDto> registerAsync(RegisterEnseignantDto dto)
    {
        var res = new Enseignant
        {
            nom = dto.nom,
            prenom = dto.prenom,
            telephone = dto.phone,
            grade = dto.grade,
        };
        
        _db.Enseignants.Add(res);
        await _db.SaveChangesAsync();

        var hasher = new PasswordHasher<Utilisateur>();
        string hashedPass = hasher.HashPassword(res, dto.mdp);

        var auth = new Authentification
        {
            email = dto.email,
            mdp = hashedPass,
            utilisateurId = res.idUt
        };
        
        _db.Authentifications.Add(auth);
        await _db.SaveChangesAsync();

        return new EnseignantDto(
            res.idUt,
            res.nom,
            res.prenom,
            res.telephone,
            res.grade,
            res.genre,
            res.adresse,
            auth.email
        );
    }

    public async Task<bool> updateAsync(string id, UpdateResponsableDto dto)
    {
        var res = await _db.Responsables.FindAsync(id);
        if (res == null) return false;
        
        _mapper.Map(dto, res);
        await _db.SaveChangesAsync();
        return true;
    }
    
    public async Task<bool> updateTeacherAsync(string id, UpdateEnseignantDto dto)
    {
        var res = await _db.Enseignants.FindAsync(id);
        if (res == null) return false;
        
        _mapper.Map(dto, res);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> deleteAsync(string id)
    {
        var res = await _db.Responsables.FindAsync(id);
        if (res == null) return false;
        
        _db.Responsables.Remove(res);
        await _db.SaveChangesAsync();
        return true;
    }
    
    public async Task<bool> deleteTeacherAsync(string id)
    {
        var res = await _db.Enseignants.FindAsync(id);
        if (res == null) return false;
        
        _db.Enseignants.Remove(res);
        await _db.SaveChangesAsync();
        return true;
    }
}