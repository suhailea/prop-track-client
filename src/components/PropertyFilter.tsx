import { Button } from "@/components/ui/button";
import { useAminities } from "@/hooks/useAminities";
import { Filter, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const propertyTypes = ["sale", "Studio", "Apartment", "Villa"];
export interface PropertyFilterValues {
  amenities: string[];
  bathrooms: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  type: string;
}

interface PropertyFilterProps {
  values: PropertyFilterValues;
  onChange: (values: PropertyFilterValues) => void;
  onReset?: () => void;
}

export default function PropertyFilter({
  values,
  onChange,
  onReset,
}: PropertyFilterProps) {
  const [localValues, setLocalValues] = useState<PropertyFilterValues>(values);
  const { amenities } = useAminities();
  // Update local values when props change
  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalValues({ ...localValues, [name]: value });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = localValues.amenities.includes(amenity)
      ? localValues.amenities.filter((a) => a !== amenity)
      : [...localValues.amenities, amenity];
    setLocalValues({ ...localValues, amenities: newAmenities });
  };

  const handleApplyFilter = () => {
    onChange(localValues);
  };

  const handleReset = () => {
    const resetValues = {
      amenities: [],
      bathrooms: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      type: "",
    };
    setLocalValues(resetValues);
    if (onReset) onReset();
  };

  return (
    <form className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 mb-3 flex flex-col gap-4 w-full max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Type
          </label>
          <select
            name="type"
            value={localValues.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800"
          >
            <option value="">Any</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            value={localValues.bedrooms}
            onChange={handleInputChange}
            placeholder="Any"
            min={0}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800"
          />
        </div>
        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Bathrooms
          </label>
          <input
            type="number"
            name="bathrooms"
            value={localValues.bathrooms}
            onChange={handleInputChange}
            placeholder="Any"
            min={0}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800"
          />
        </div>
        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Min Price
          </label>
          <input
            type="number"
            name="minPrice"
            value={localValues.minPrice}
            onChange={handleInputChange}
            placeholder="0"
            min={0}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800"
          />
        </div>
        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Max Price
          </label>
          <input
            type="number"
            name="maxPrice"
            value={localValues.maxPrice}
            onChange={handleInputChange}
            placeholder="Any"
            min={0}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800"
          />
        </div>
      </div>
      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Amenities
        </label>
        <div className="flex flex-wrap gap-2">
          {amenities &&
            amenities.map((amenity) => (
              <button
                type="button"
                key={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                  localValues.amenities.includes(amenity)
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-primary/10"
                }`}
              >
                {amenity}
              </button>
            ))}
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button type="button" onClick={handleApplyFilter}>
          <Filter className="w-4 h-4" />
          Apply Filter
        </Button>
      </div>
    </form>
  );
}
