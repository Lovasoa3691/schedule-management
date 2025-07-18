using edt_api.config;
using edt_api.dtos;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using edt_api.models;
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

    public async Task<ResponsableDto?> getByIdAsync(string id)
    {
        var res = await _db.Responsables.FindAsync(id);
        return res == null ? null : _mapper.Map<ResponsableDto>(res);
    }

    public async Task<ResponsableDto> createAsync(CreateResponsableDto dto)
    {
        // var entity = _mapper.Map<Responsable>(dto);

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
            auth.email
        );
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
            res.grade
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

    public async Task<bool> deleteAsync(string id)
    {
        var res = await _db.Responsables.FindAsync(id);
        if (res == null) return false;
        
        _db.Responsables.Remove(res);
        await _db.SaveChangesAsync();
        return true;
    }
}