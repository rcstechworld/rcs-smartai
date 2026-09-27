using Microsoft.AspNetCore.Mvc;
using RCS.SmartAI.Application.Businesses;
using RCS.SmartAI.Application.Businesses.Dtos;
using RCS.SmartAI.Application.Businesses.Repositories;

namespace RCS.SmartAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusinessesController : ControllerBase
{
    private readonly IBusinessBrainRepository _repository;

    public BusinessesController(IBusinessBrainRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public async Task<ActionResult<BusinessBrain>> Create(
        CreateBusinessBrainRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.BusinessName))
        {
            return BadRequest("BusinessName is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Category))
        {
            return BadRequest("Category is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Location))
        {
            return BadRequest("Location is required.");
        }

        if (!request.TermsPrivacyConsent)
        {
            return BadRequest("TermsPrivacyConsent is required.");
        }

        var now = DateTime.UtcNow;

        var business = new BusinessBrain
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            BusinessName = request.BusinessName,
            Category = request.Category,
            Location = request.Location,
            Website = request.Website,
            Description = request.Description,
            Services = request.Services,
            Products = request.Products,
            BusinessHours = request.BusinessHours,
            TargetCustomers = request.TargetCustomers,
            AiTone = request.AiTone,
            Offers = request.Offers,
            AiMustNotClaim = request.AiMustNotClaim,
            TermsPrivacyConsent = request.TermsPrivacyConsent,
            AiSuggestionsConsent = request.AiSuggestionsConsent,
            HumanApprovalBeforePublishing =
                request.HumanApprovalBeforePublishing,
            ConsentVersion = "v1",
            ConsentAtUtc = now,
            CreatedAtUtc = now,
            UpdatedAtUtc = now
        };

        var created = await _repository.CreateAsync(business);

        return CreatedAtAction(
            nameof(Get),
            new { id = created.Id },
            created);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<BusinessBrain>> Get(Guid id)
    {
        var business = await _repository.GetAsync(id);

        if (business is null)
        {
            return NotFound();
        }

        return Ok(business);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<BusinessBrain>> Update(
        Guid id,
        CreateBusinessBrainRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.BusinessName))
        {
            return BadRequest("BusinessName is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Category))
        {
            return BadRequest("Category is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Location))
        {
            return BadRequest("Location is required.");
        }

        if (!request.TermsPrivacyConsent)
        {
            return BadRequest("TermsPrivacyConsent is required.");
        }

        var business = await _repository.GetAsync(id);

        if (business is null)
        {
            return NotFound();
        }

        business.BusinessName = request.BusinessName;
        business.Category = request.Category;
        business.Location = request.Location;
        business.Website = request.Website;
        business.Description = request.Description;
        business.Services = request.Services;
        business.Products = request.Products;
        business.BusinessHours = request.BusinessHours;
        business.TargetCustomers = request.TargetCustomers;
        business.AiTone = request.AiTone;
        business.Offers = request.Offers;
        business.AiMustNotClaim = request.AiMustNotClaim;
        business.TermsPrivacyConsent = request.TermsPrivacyConsent;
        business.AiSuggestionsConsent = request.AiSuggestionsConsent;
        business.HumanApprovalBeforePublishing =
            request.HumanApprovalBeforePublishing;
        business.UpdatedAtUtc = DateTime.UtcNow;

        var updated = await _repository.UpdateAsync(business);

        if (updated is null)
        {
            return NotFound();
        }

        return Ok(updated);
    }
}
