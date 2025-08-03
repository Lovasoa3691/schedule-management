using System.Security.Claims;
using edt_api.dtos;
using edt_api.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace edt_api.controllers;

[ApiController]
[Route("api/utilisateur")]
public class UtilisateurController : ControllerBase
{
    private readonly IUtilisateur _service;

    public UtilisateurController(IUtilisateur service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ResponsableDto>>> GetAll()
        => Ok(await _service.getAllAsync());

    [HttpGet("teacher/info")]
    public async Task<ActionResult<IEnumerable<ResponsableDto>>> GetInfo()
        => Ok(await _service.getInfoTeacherAsync());

    [HttpGet("teacher")]
    public async Task<ActionResult<IEnumerable<EnseignantDto>>> GetAllTeacher()
        => Ok(await _service.getAllTeacherAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<ResponsableDto>> GetById(string id)
    {
        var res = await _service.getByIdAsync(id);
        return res == null ? NotFound() : Ok(res);
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok(id);
    }

    [HttpPost("responsable/register")]
    public async Task<ActionResult<ResponsableDto>> AddResponsable([FromBody] CreateResponsableDto dto)
    {
        var created = await _service.createAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.id }, created);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<ResponsableDto>> Login([FromBody] LoginDto dto)
    {
        var user = await _service.getUserConnected(dto);
        if (user == null) return Unauthorized("Email ou mot de passe invalide");
        Response.Cookies.Append("jwt", user.token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.Now.AddHours(2),
            Path = "/"
        });

        return Ok(new { email = user.email });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt", new CookieOptions
        {
            HttpOnly = true,
            Secure = true, 
            SameSite = SameSiteMode.None,
            Path = "/"
        });
        return Ok(new { message = "Déconnecté avec succès" });
    }

    [HttpPost("add/teacher")]
    public async Task<ActionResult<EnseignantDto>> Create([FromBody]CreateEnseignantDto dto)
    {
        var created = await _service.addAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.id }, created);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateResponsableDto dto)
    {
        var ok = await _service.updateAsync(id, dto);
        return ok ? NoContent() : NotFound();
    }
    
    [HttpPut("teacher/{id}")]
    public async Task<IActionResult> UpdateTeacher( string id,[FromBody] UpdateEnseignantDto dto)
    {
        var ok = await _service.updateTeacherAsync(id, dto);
        return ok ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var ok = await _service.deleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeacher(string id)
    {
        var ok = await _service.deleteTeacherAsync(id);
        return ok ? NoContent() : NotFound();
    }
}