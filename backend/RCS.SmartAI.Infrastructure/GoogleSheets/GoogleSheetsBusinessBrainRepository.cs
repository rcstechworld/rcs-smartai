using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using RCS.SmartAI.Application.Businesses;
using RCS.SmartAI.Application.Businesses.Repositories;

namespace RCS.SmartAI.Infrastructure.GoogleSheets;

public sealed class GoogleSheetsBusinessBrainRepository : IBusinessBrainRepository
{
    private const string SheetName = "Businesses";

    private readonly SheetsService _sheets;
    private readonly string _spreadsheetId;

    public GoogleSheetsBusinessBrainRepository()
    {
        var credentialsPath =
            Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");

        _spreadsheetId =
            Environment.GetEnvironmentVariable("GOOGLE_SHEETS_SPREADSHEET_ID")
            ?? throw new InvalidOperationException(
                "GOOGLE_SHEETS_SPREADSHEET_ID environment variable is missing.");

        if (string.IsNullOrWhiteSpace(credentialsPath))
        {
            throw new InvalidOperationException(
                "GOOGLE_APPLICATION_CREDENTIALS environment variable is missing.");
        }

        if (!File.Exists(credentialsPath))
        {
            throw new FileNotFoundException(
                "Google service account JSON file was not found.",
                credentialsPath);
        }

        var credential = GoogleCredential
            .FromFile(credentialsPath)
            .CreateScoped(SheetsService.Scope.Spreadsheets);

        _sheets = new SheetsService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credential,
            ApplicationName = "RCS SmartAI"
        });
    }

    public async Task<BusinessBrain> CreateAsync(BusinessBrain business)
    {
        var row = ToRow(business);

        var body = new ValueRange
        {
            Values = new List<IList<object>>
            {
                row
            }
        };

        var request = _sheets.Spreadsheets.Values.Append(
            body,
            _spreadsheetId,
            $"{SheetName}!A:U");

        request.ValueInputOption =
            SpreadsheetsResource.ValuesResource.AppendRequest
                .ValueInputOptionEnum.USERENTERED;

        await request.ExecuteAsync();

        return business;
    }

    public async Task<BusinessBrain?> GetAsync(Guid id)
    {
        var values = await GetAllRowsAsync();

        foreach (var row in values.Skip(1))
        {
            if (row.Count == 0)
                continue;

            var rowId = GetString(row, 0);

            if (Guid.TryParse(rowId, out var parsedId) && parsedId == id)
            {
                return FromRow(row);
            }
        }

        return null;
    }

    public async Task<BusinessBrain?> UpdateAsync(BusinessBrain business)
    {
        var response = await _sheets.Spreadsheets.Values.Get(
            _spreadsheetId,
            $"{SheetName}!A:U")
            .ExecuteAsync();

        var values = response.Values;

        if (values == null || values.Count == 0)
            return null;

        for (var index = 1; index < values.Count; index++)
        {
            var row = values[index];

            if (row.Count == 0)
                continue;

            var rowId = GetString(row, 0);

            if (!Guid.TryParse(rowId, out var parsedId) ||
                parsedId != business.Id)
            {
                continue;
            }

            var rowNumber = index + 1;

            var body = new ValueRange
            {
                Values = new List<IList<object>>
                {
                    ToRow(business)
                }
            };

            var updateRequest = _sheets.Spreadsheets.Values.Update(
                body,
                _spreadsheetId,
                $"{SheetName}!A{rowNumber}:U{rowNumber}");

            updateRequest.ValueInputOption =
                SpreadsheetsResource.ValuesResource.UpdateRequest
                    .ValueInputOptionEnum.USERENTERED;

            await updateRequest.ExecuteAsync();

            return business;
        }

        return null;
    }

    private async Task<IList<IList<object>>> GetAllRowsAsync()
    {
        var response = await _sheets.Spreadsheets.Values.Get(
            _spreadsheetId,
            $"{SheetName}!A:U")
            .ExecuteAsync();

        return response.Values ?? new List<IList<object>>();
    }

    private static IList<object> ToRow(BusinessBrain business)
    {
        return new List<object>
        {
            business.Id.ToString(),
            business.UserId.ToString(),
            business.BusinessName,
            business.Category,
            business.Location,
            business.Website ?? "",
            business.Description ?? "",
            business.Services ?? "",
            business.Products ?? "",
            business.BusinessHours ?? "",
            business.TargetCustomers ?? "",
            business.AiTone ?? "",
            business.Offers ?? "",
            business.AiMustNotClaim ?? "",
            business.TermsPrivacyConsent,
            business.AiSuggestionsConsent,
            business.HumanApprovalBeforePublishing,
            business.ConsentVersion,
            business.ConsentAtUtc.ToString("O"),
            business.CreatedAtUtc.ToString("O"),
            business.UpdatedAtUtc.ToString("O")
        };
    }

    private static BusinessBrain FromRow(IList<object> row)
    {
        return new BusinessBrain
        {
            Id = Guid.Parse(GetString(row, 0)),
            UserId = Guid.Parse(GetString(row, 1)),
            BusinessName = GetString(row, 2),
            Category = GetString(row, 3),
            Location = GetString(row, 4),
            Website = GetNullableString(row, 5),
            Description = GetNullableString(row, 6),
            Services = GetNullableString(row, 7),
            Products = GetNullableString(row, 8),
            BusinessHours = GetNullableString(row, 9),
            TargetCustomers = GetNullableString(row, 10),
            AiTone = GetNullableString(row, 11),
            Offers = GetNullableString(row, 12),
            AiMustNotClaim = GetNullableString(row, 13),
            TermsPrivacyConsent = GetBool(row, 14),
            AiSuggestionsConsent = GetBool(row, 15),
            HumanApprovalBeforePublishing = GetBool(row, 16),
            ConsentVersion = GetString(row, 17),
            ConsentAtUtc = GetDateTime(row, 18),
            CreatedAtUtc = GetDateTime(row, 19),
            UpdatedAtUtc = GetDateTime(row, 20)
        };
    }

    private static string GetString(IList<object> row, int index)
    {
        return index < row.Count
            ? row[index]?.ToString() ?? ""
            : "";
    }

    private static string? GetNullableString(IList<object> row, int index)
    {
        var value = GetString(row, index);
        return string.IsNullOrWhiteSpace(value) ? null : value;
    }

    private static bool GetBool(IList<object> row, int index)
    {
        var value = GetString(row, index);

        return bool.TryParse(value, out var result) && result;
    }

    private static DateTime GetDateTime(IList<object> row, int index)
    {
        var value = GetString(row, index);

        return DateTime.TryParse(
            value,
            null,
            System.Globalization.DateTimeStyles.RoundtripKind,
            out var result)
            ? result
            : DateTime.UtcNow;
    }
}
