using edt_api.dtos;
using edt_api.services;
using Microsoft.AspNetCore.Mvc;

namespace edt_api.controllers;

[ApiController]
[Route("api/utilisateur")]
public class UtilisateurController: ControllerBase
{
    private readonly IUtilisateur _service;

    public UtilisateurController(IUtilisateur service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ResponsableDto>>> GetAll()
        => Ok(await _service.getAllAsync());
    
    [HttpGet("teacher")]
    public async Task<ActionResult<IEnumerable<EnseignantDto>>> GetAllTeacher()
        => Ok(await _service.getAllTeacherAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<ResponsableDto>> GetById(string id)
    {
        var res = await _service.getByIdAsync(id);
        return res == null ? NotFound() : Ok(res);
    }
    
    [HttpPost("add")]
    public async Task<ActionResult<ResponsableDto>> AddResponsable()
    {
        var dto = new CreateResponsableDto(
            nom: "FENONANTENAIKO",
            prenom:"Lovasoa Julianot",
            phone:"+261345416063",
            fonction:"Admin",
            genre:"Masculin",
            adresse:"Fenomanana",
            email:"admin@gmail.com",
            mdp:"admin3691"
        );
        
        var created = await _service.createAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.id }, created);
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