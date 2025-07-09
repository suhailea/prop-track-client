import { Button } from "@/components/ui/button";
import { useAminities } from "@/hooks/useAminities";
import { Filter, RotateCcw, ChevronDown } from "lucide-react";
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
  const [showAmenities, setShowAmenities] = useState(false);

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
    <form className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow p-2 mb-3 flex flex-col gap-2 w-full">
      <div className="flex flex-wrap items-center gap-2">
        {/* Type */}
        <select
          name="type"
          value={localValues.type}
          onChange={handleInputChange}
          className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 min-w-[90px]"
        >
          <option value="">Type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {/* Bedrooms */}
        <input
          type="number"
          name="bedrooms"
          value={localValues.bedrooms}
          onChange={handleInputChange}
          placeholder="Bedrooms"
          min={0}
          className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 w-20"
        />
        {/* Bathrooms */}
        <input
          type="number"
          name="bathrooms"
          value={localValues.bathrooms}
          onChange={handleInputChange}
          placeholder="Baths"
          min={0}
          className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 w-20"
        />
        {/* Min Price */}
        <input
          type="number"
          name="minPrice"
          value={localValues.minPrice}
          onChange={handleInputChange}
          placeholder="Min $"
          min={0}
          className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 w-24"
        />
        {/* Max Price */}
        <input
          type="number"
          name="maxPrice"
          value={localValues.maxPrice}
          onChange={handleInputChange}
          placeholder="Max $"
          min={0}
          className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 w-24"
        />
        {/* Amenities Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAmenities((v) => !v)}
            className="flex items-center gap-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 min-w-[90px]"
          >
            Amenities <ChevronDown className="w-4 h-4" />
          </button>
          {showAmenities && (
            <div className="absolute z-10 mt-1 left-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2 min-w-[160px] max-h-48 overflow-y-auto">
              {amenities && amenities.length > 0 ? (
                amenities.map((amenity) => (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`block w-full text-left px-2 py-1 rounded text-xs font-medium mb-1 transition-colors ${
                      localValues.amenities.includes(amenity)
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {amenity}
                  </button>
                ))
              ) : (
                <div className="text-xs text-gray-400">No amenities</div>
              )}
            </div>
          )}
        </div>
        {/* Selected amenities as tags */}
        {localValues.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {localValues.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-1 ml-auto">
          <Button type="button" variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button type="button" size="sm" onClick={handleApplyFilter}>
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
