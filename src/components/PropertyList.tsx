import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useApi } from "@/hooks/useApi";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { PropertyDetails } from "./PropertyDetails";
import PropertyFilter, { type PropertyFilterValues } from "./PropertyFilter";

const defaultFilter: PropertyFilterValues = {
  minPrice: "",
  maxPrice: "",
  type: "",
  bathrooms: "",
  bedrooms: "",
  amenities: [],
};

// Define the PropertyLocation type
interface PropertyLocation {
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  country: string;
  state: string;
}

// Update Property to use PropertyLocation
interface Property {
  id: string;
  images: string[];
  title: string;
  price: string;
  location: PropertyLocation;
  type: string;
  amenities: string[];
}

// Add interface for paginated response
interface PaginatedProperties {
  properties: Property[];
  total: number;
}

export default function PropertyList() {
  const { makeRequest, data } = useApi<Property[]>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [pageSize] = useState(15);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<PropertyFilterValues>(defaultFilter);

  useEffect(() => {
    makeRequest(`/api/agent/properties`, {
      method: "POST",
      body: {
        page,
        pageSize,
        filter,
      },
    });
  }, [makeRequest, page, pageSize, filter]);

  useEffect(() => {
    if (data) {
      // If your API returns { properties, total }, update accordingly
      const typedData = data as PaginatedProperties | Property[];
      if (Array.isArray(typedData)) {
        setProperties(typedData);
        // setTotal(0); // If you don't have total, comment this out
      } else {
        setProperties(typedData.properties || []);
        setTotal(typedData.total || 0);
      }
    }
  }, [data]);

  const handleReset = () => setFilter(defaultFilter);

  return (
    <section className="w-full max-w-5xl  px-4 py-2">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Available Properties
      </h2>

      <PropertyFilter
        values={filter}
        onChange={setFilter}
        onReset={handleReset}
      />
      {properties.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-300 py-12">
          No properties found matching your criteria.
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 w-[270px] h-[420px]"
              >
                <div className="relative w-full h-[180px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg">
                  <img
                    src={property.images[0] || "/placeholder.png"}
                    alt={property.title}
                    className="w-full h-full object-cover block"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />

                  <PropertyDetails property={property}>
                    <Button
                      className="absolute top-2 right-2 z-10 px-3 py-1 text-xs rounded-md shadow bg-white/90 hover:bg-white"
                      variant="secondary"
                      style={{ fontWeight: 600 }}
                    >
                      View Details
                    </Button>
                  </PropertyDetails>
                  <span
                    className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded ${
                      property.type === "Sale"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {property.type}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1 gap-1">
                  <h3
                    className="text-base font-semibold text-gray-900 dark:text-white mb-1 truncate"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {property.title}
                  </h3>
                  <div
                    className="text-lg font-bold text-primary mb-0.5 truncate"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {property.price}
                  </div>
                  <div
                    className="text-xs text-gray-500 dark:text-gray-300 mb-1 truncate"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {property.location.address}, {property.location.city},{" "}
                    {property.location.state}, {property.location.country}
                  </div>
                  <div
                    className="flex flex-wrap gap-1 mb-1"
                    style={{ maxHeight: 32, overflow: "hidden" }}
                  >
                    {property.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-800 text-[10px] px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-200"
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: 80,
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <PropertyDetails property={property}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full mt-auto font-semibold flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> Inquiry
                  </Button>
                </PropertyDetails>
              </div>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  aria-disabled={page === 1}
                />
              </PaginationItem>
              {Array.from({
                length: Math.max(1, Math.ceil(total / pageSize)),
              }).map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href="#"
                    isActive={page === idx + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(idx + 1);
                    }}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const totalPages = Math.ceil(total / pageSize);
                    if (page < totalPages) setPage(page + 1);
                  }}
                  aria-disabled={
                    page === Math.ceil(total / pageSize) || total === 0
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </section>
  );
}
