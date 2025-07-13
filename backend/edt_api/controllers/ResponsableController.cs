using edt_api.dtos;
using edt_api.services;
using Microsoft.AspNetCore.Mvc;

namespace edt_api.controllers;

[ApiController]
[Route("api/responsable")]
public class ResponsableController: ControllerBase
{
    private readonly IResponsable _service;

    public ResponsableController(IResponsable service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ResponsableDto>>> GetAll()
        => Ok(await _service.getAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<ResponsableDto>> GetById(string id)
    {
        var res = await _service.getByIdAsync(id);
        return res == null ? NotFound() : Ok(res);
    }

    [HttpPost]
    public async Task<ActionResult<ResponsableDto>> Create()
    {
        var dto = new RegisterResponsableDto(
            nom: "FENONANTENAIKO",
            prenom:"Lovasoa Julianot",
            phone:"+261345416063",
            fonction:"Secretary",
            email:"lovasoa@gmail.com",
            mdp:"orion3691"
        );
        
        var created = await _service.registerAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.id }, created);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateResponsableDto dto)
    {
        var ok = await _service.updateAsync(id, dto);
        return ok ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var ok = await _service.deleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
}