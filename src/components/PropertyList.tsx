import { Button } from "@/components/ui/button";
import PropertyFilter, { type PropertyFilterValues } from "./PropertyFilter";
import { useState, useMemo } from "react";
import { Mail } from "lucide-react";

const mockProperties = [
  {
    id: 1,
    title: "Modern Family Home",
    price: "$450,000",
    type: "Sale",
    location: "123 Maple St, Springfield, IL",
    amenities: ["3 Beds", "2 Baths", "Garage", "Garden"],
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Downtown Apartment",
    price: "$1,800/mo",
    type: "Rent",
    location: "456 Main Ave, Chicago, IL",
    amenities: ["2 Beds", "1 Bath", "Balcony", "Gym Access"],
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Luxury Condo",
    price: "$3,200/mo",
    type: "Rent",
    location: "789 Lakeview Dr, Evanston, IL",
    amenities: ["3 Beds", "2 Baths", "Pool", "Concierge"],
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Family Home",
    price: "$3,200/mo",
    type: "Rent",
    location: "123 Main St, Springfield, IL",
    amenities: ["3 Beds", "2 Baths", "Garage", "Garden"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
  },
];

const defaultFilter: PropertyFilterValues = {
  location: "",
  minPrice: "",
  maxPrice: "",
  type: "",
  amenities: [],
};

function parsePrice(price: string) {
  // Remove $ and /mo, then parse as number
  return Number(price.replace(/[^\d.]/g, ""));
}

export default function PropertyList() {
  const [filter, setFilter] = useState<PropertyFilterValues>(defaultFilter);

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // Location filter
      if (
        filter.location &&
        !property.location.toLowerCase().includes(filter.location.toLowerCase())
      ) {
        return false;
      }
      // Type filter
      if (filter.type && property.type !== filter.type) {
        return false;
      }
      // Price filter
      const priceValue = parsePrice(property.price);
      if (filter.minPrice && priceValue < Number(filter.minPrice)) {
        return false;
      }
      if (filter.maxPrice && priceValue > Number(filter.maxPrice)) {
        return false;
      }
      // Amenities filter (all selected amenities must be present)
      if (
        filter.amenities.length > 0 &&
        !filter.amenities.every((a) => property.amenities.includes(a))
      ) {
        return false;
      }
      return true;
    });
  }, [filter]);

  const handleReset = () => setFilter(defaultFilter);

  return (
    <section className="w-full max-w-5xl  px-4 py-2">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Available Properties
      </h2>
      {filteredProperties.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-300 py-12">
          No properties found matching your criteria.
        </div>
      ) : (
        <>
          <PropertyFilter
            values={filter}
            onChange={setFilter}
            onReset={handleReset}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800"
                style={{ minHeight: 320, maxWidth: 340, margin: '0 auto' }}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-36 w-full object-cover"
                  />
                  <Button
                    className="absolute top-2 right-2 z-10 px-3 py-1 text-xs rounded-md shadow bg-white/90 hover:bg-white"
                    variant="secondary"
                    style={{ fontWeight: 600 }}
                  >
                    View Details
                  </Button>
                  <span
                    className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded ${property.type === "Sale" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {property.type}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1 gap-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate mb-1">
                    {property.title}
                  </h3>
                  <div className="text-lg font-bold text-primary mb-0.5">
                    {property.price}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 mb-1 truncate">
                    {property.location}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {property.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-800 text-[10px] px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-200"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full mt-auto font-semibold flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> Inquiry
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
