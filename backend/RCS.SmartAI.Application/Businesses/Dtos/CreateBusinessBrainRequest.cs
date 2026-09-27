namespace RCS.SmartAI.Application.Businesses.Dtos;

public class CreateBusinessBrainRequest
{
    public Guid UserId { get; set; }

    public string BusinessName { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string Location { get; set; } = string.Empty;

    public string? Website { get; set; }

    public string? Description { get; set; }

    public string? Services { get; set; }

    public string? Products { get; set; }

    public string? BusinessHours { get; set; }

    public string? TargetCustomers { get; set; }

    public string? AiTone { get; set; }

    public string? Offers { get; set; }

    public string? AiMustNotClaim { get; set; }

    public bool TermsPrivacyConsent { get; set; }

    public bool AiSuggestionsConsent { get; set; }

    public bool HumanApprovalBeforePublishing { get; set; } = true;
}
