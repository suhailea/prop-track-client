import { Button } from "@/components/ui/button";

const propertyTypes = ["Sale", "Rent"];
const amenitiesList = ["3 Beds", "2 Beds", "1 Bath", "2 Baths", "Garage", "Garden", "Balcony", "Gym Access", "Pool", "Concierge"];

export interface PropertyFilterValues {
  location: string;
  minPrice: string;
  maxPrice: string;
  type: string;
  amenities: string[];
}

interface PropertyFilterProps {
  values: PropertyFilterValues;
  onChange: (values: PropertyFilterValues) => void;
  onReset?: () => void;
}

export default function PropertyFilter({ values, onChange, onReset }: PropertyFilterProps) {
  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...values, [name]: value });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = values.amenities.includes(amenity)
      ? values.amenities.filter((a) => a !== amenity)
      : [...values.amenities, amenity];
    onChange({ ...values, amenities: newAmenities });
  };

  return (
    <form className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8 flex flex-col gap-4 w-full max-w-5xl ">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={values.location}
            onChange={handleInputChange}
            placeholder="Enter city, address, or ZIP"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800 placeholder-gray-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Type</label>
          <select
            name="type"
            value={values.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800"
          >
            <option value="">Any</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={values.minPrice}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800 placeholder-gray-400"
              min={0}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={values.maxPrice}
              onChange={handleInputChange}
              placeholder="Any"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800 placeholder-gray-400"
              min={0}
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Amenities</label>
        <div className="flex flex-wrap gap-2">
          {amenitiesList.map((amenity) => (
            <button
              type="button"
              key={amenity}
              onClick={() => handleAmenityToggle(amenity)}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${values.amenities.includes(amenity)
                ? "bg-primary text-white border-primary"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-primary/10"}`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-2">
        {onReset && (
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>
        )}
      </div>
    </form>
  );
}
