// macroProfiles.js

// Protein Requirement Calculation (based on weight)
const calculateProtein = (weight) => {
    // Protein in grams per pound (0.7g to 1g per lb)
    const minProtein = weight * 0.7;  // Minimum protein intake
    const maxProtein = weight * 1.2;  // Maximum protein intake
    return { minProtein, maxProtein };
  };
  
  // Carbohydrate Requirement Calculation (percentage of total calories)
  const calculateCarbs = (totalCalories, carbPercentage) => {
    // Carbs are calculated as a percentage of total calories
    const carbsInGrams = (totalCalories * (carbPercentage / 100)) / 4;  // 4 calories per gram of carbs
    return carbsInGrams;
  };
  
  // Fat Requirement Calculation (percentage of total calories)
  const calculateFats = (totalCalories, fatPercentage) => {
    // Fats are calculated as a percentage of total calories
    const fatsInGrams = (totalCalories * (fatPercentage / 100)) / 9;  // 9 calories per gram of fats
    return fatsInGrams;
  };
  
  // Fiber Requirement Calculation (14g per 1,000 calories)
  const calculateFiber = (totalCalories) => {
    const fiberInGrams = (totalCalories / 1000) * 14;  // 14 grams of fiber per 1,000 calories
    return fiberInGrams;
  };
  
  // Example usage
  const userWeight = 180;  // User's weight in lbs
  const totalCalories = 2500;  // User's total daily calories (e.g., from TDEE calculation)
  const carbPercentage = 50;  // Carb percentage, customizable by user (e.g., 50%)
  const fatPercentage = 25;  // Fat percentage, customizable by user (e.g., 25%)
  
  const protein = calculateProtein(userWeight);
  const carbs = calculateCarbs(totalCalories, carbPercentage);
  const fats = calculateFats(totalCalories, fatPercentage);
  const fiber = calculateFiber(totalCalories);
  
  // Display results
  console.log(`Protein range: ${protein.minProtein.toFixed(2)}g to ${protein.maxProtein.toFixed(2)}g`);
  console.log(`Carbs: ${carbs.toFixed(2)}g`);
  console.log(`Fats: ${fats.toFixed(2)}g`);
  console.log(`Fiber: ${fiber.toFixed(2)}g`);
  