using RCS.SmartAI.Application.Businesses;

namespace RCS.SmartAI.Application.Businesses.Repositories;

public interface IBusinessBrainRepository
{
    Task<BusinessBrain> CreateAsync(BusinessBrain business);
    Task<BusinessBrain?> GetAsync(Guid id);
    Task<BusinessBrain?> UpdateAsync(BusinessBrain business);
}
