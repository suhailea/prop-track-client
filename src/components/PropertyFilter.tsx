import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
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
  const { makeRequest, data } = useApi();
  const [amenities, setAmenities] = useState([] as string[]);

  useEffect(() => {
    makeRequest(`/api/agent/properties/amenities`);
  }, [makeRequest]);

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) setAmenities(data || []);
      else setAmenities([]);
    }
  }, [data]);

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    <form className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 mb-3 flex flex-col gap-4 w-full max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Type
          </label>
          <select
            name="type"
            value={values.type}
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
            value={values.bedrooms}
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
            value={values.bathrooms}
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
            value={values.minPrice}
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
            value={values.maxPrice}
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
          {amenities.map((amenity) => (
            <button
              type="button"
              key={amenity}
              onClick={() => handleAmenityToggle(amenity)}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                values.amenities.includes(amenity)
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
        {onReset && (
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>
        )}
      </div>
    </form>
  );
}
