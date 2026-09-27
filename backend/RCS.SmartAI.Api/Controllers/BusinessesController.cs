using Microsoft.AspNetCore.Mvc;
using RCS.SmartAI.Application.Businesses;
using RCS.SmartAI.Application.Businesses.Dtos;

namespace RCS.SmartAI.Api.Controllers;

[ApiController]
[Route("api/businesses")]
public class BusinessesController : ControllerBase
{
    private static readonly Dictionary<Guid, BusinessBrain> Businesses = new();

    [HttpPost]
    public ActionResult<BusinessBrain> Create(CreateBusinessBrainRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.BusinessName))
        {
            return BadRequest("Business name is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Category))
        {
            return BadRequest("Business category is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Location))
        {
            return BadRequest("Business location is required.");
        }

        if (!request.TermsPrivacyConsent)
        {
            return BadRequest("Terms and Privacy consent is required.");
        }

        var business = new BusinessBrain
        {
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
            ConsentAtUtc = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            UpdatedAtUtc = DateTime.UtcNow
        };

        Businesses[business.Id] = business;

        return CreatedAtAction(
            nameof(Get),
            new { id = business.Id },
            business);
    }

    [HttpGet("{id:guid}")]
    public ActionResult<BusinessBrain> Get(Guid id)
    {
        if (!Businesses.TryGetValue(id, out var business))
        {
            return NotFound();
        }

        return Ok(business);
    }

    [HttpPut("{id:guid}")]
    public ActionResult<BusinessBrain> Update(
        Guid id,
        CreateBusinessBrainRequest request)
    {
        if (!Businesses.TryGetValue(id, out var business))
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

        return Ok(business);
    }
}
