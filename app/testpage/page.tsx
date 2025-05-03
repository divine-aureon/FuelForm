import useFuelFormData from "@/lib/hooks/CoreData"

const { fitnessGoals } = useFuelFormData();

export default function testpage() {

    const CalorieGoal = fitnessGoals?.calorieGoal;

    return (
        <div>

<form onSubmit={handleSubmit} className="space-y-4">

          <p className="text-lg text-white font-semibold mb-1">
            calorie goal
            <input           
              value = {CalorieGoal}
              className="w-full p-3 mb-2 rounded bg-gray-800/70 text-white border-none focus:outline-none appearance-none"
              required
            />
          </p>



        </form>
      </div>

    );

}