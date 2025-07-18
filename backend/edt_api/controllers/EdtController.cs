using edt_api.dtos;
using edt_api.services;
using Microsoft.AspNetCore.Mvc;

namespace edt_api.controllers;

[ApiController]
[Route("api/edt")]
public class EdtController: ControllerBase
{
    private readonly IEdt _service;

    public EdtController(IEdt service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EdtDto>>> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<EdtDto>> GetById(string id)
    {
        var res = await _service.GetByIdAsync(id);
        return res == null ? NotFound() : Ok(res);
    }

    [HttpPost]
    public async Task<ActionResult<EdtDto>> Create()
    {
        var dto = new CreateEdtDto(
            jour:new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day),
            hDeb:  new TimeOnly(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second),
            hFin:   new TimeOnly(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second),
            dispo: "En cours",
            type:"Hebdomadaire",
            responsableId:"24c7e9b5-c025-4eff-be77-6194e529513c",
            idSalle: 1,
            enseignantId:"287e07d9-113b-46a6-b06f-6928ba672421",
            mentionId:4,
            niveauId:4,
            matiereId:"cef94c10-d75e-40f1-b206-4adb4b35fac0"
        );

       var created = await _service.AddAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.numEd }, created);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateEdtDto dto)
    {
        var ok = await _service.UpdateAsync(id, dto);
        return ok ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var ok = await _service.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
}