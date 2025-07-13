using AutoMapper;
using edt_api.config;
using edt_api.dtos;
using edt_api.models;
using Microsoft.EntityFrameworkCore;

namespace edt_api.services;

public class IMMention: IMention
{
    
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public IMMention(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<MentionDto>> getAllAsync()
    {
        var mention = await _db.Mentions.ToListAsync();
        return _mapper.Map<IEnumerable<MentionDto>>(mention);
    }

    public async Task<MentionDto> getByIdAsync(int id)
    {
        var res = await _db.Mentions.FindAsync(id);
        return res == null ? null : _mapper.Map<MentionDto>(res);
    }

    public async Task<MentionDto> createAsync(CreateMentionDto dto)
    {
        var mention = new Mention
        {
            nomMent = dto.nomMention
        };
        
        _db.Mentions.Add(mention);
        await _db.SaveChangesAsync();
        return _mapper.Map<MentionDto>(mention);
    }

    public async Task<bool> updateAsync(int id, UpdateMentionDto dto)
    {
        var res = await _db.Mentions.FindAsync(id);
        if (res == null) return false;
        
        _mapper.Map(dto, res);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> deleteAsync(int id)
    {
        var res = await _db.Mentions.FindAsync(id);
        if (res == null) return false;
        
        _db.Mentions.Remove(res);
        await _db.SaveChangesAsync();
        return true;
    }
}