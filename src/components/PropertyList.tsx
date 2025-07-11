import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useApi } from "@/hooks/useApi";
import { useUser } from "@/hooks/useUser";
import { Archive, Mail, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import CreateProperty from "./CreatePropert";
import PropertyLayout from "./layouts/PropertyLayout";
import { PropertyDetails } from "./PropertyDetails";
import PropertyFilter, { type PropertyFilterValues } from "./PropertyFilter";
import { ConfirmButton } from "./ui/conformation-button";
import LeafletMap from "./Map";

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
  areaSqFt: number;
  bathrooms: number;
  bedrooms: number;
  createdAt: string;
  description: string;
}

// Add interface for paginated response
interface PaginatedProperties {
  properties: Property[];
  total: number;
}

export default function PropertyList({ showLayout = true }) {
  const { makeRequest, data, error } = useApi<Property[]>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [pageSize] = useState(9);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<PropertyFilterValues>(defaultFilter);
  const [appliedFilter, setAppliedFilter] =
    useState<PropertyFilterValues>(defaultFilter);
  const user = useUser();

  useEffect(() => {
    makeRequest(`/api/agent/properties`, {
      method: "POST",
      body: {
        page,
        pageSize,
        filter: appliedFilter,
      },
    });
  }, [makeRequest, page, pageSize, appliedFilter]);

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

  const archiveProperty = async (id: string) => {
    await makeRequest(`/api/agent/properties/${id}/archive`, {
      method: "PATCH",
    });

    if (!error) {
      setProperties((prev) => prev.filter((property) => property.id !== id));
    }
  };

  const handleReset = () => {
    setFilter(defaultFilter);
    setAppliedFilter(defaultFilter);
  };

  const handleApplyFilter = (newFilter: PropertyFilterValues) => {
    setAppliedFilter(newFilter);
    setPage(1); // Reset to first page when applying new filter
  };

  return (
    <HandleLayout showLayout={showLayout} handleReset={handleReset}>
      {showLayout && (
        <PropertyFilter
          values={filter}
          onChange={handleApplyFilter}
          onReset={handleReset}
        />
      )}
      {properties.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-300 py-12">
          No properties found matching your criteria.
        </div>
      ) : (
        <>
          <div
            className={`grid gap-6 md:grid-cols-2 ${
              showLayout ? "lg:grid-cols-4" : "lg:grid-cols-2"
            } justify-items-center`}
          >
            {properties.map((property: Property) => (
              <div
                key={property.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 w-[270px] h-[320px]"
              >
                <div className="relative w-full h-[140px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg">
                  <img
                    src={property.images[0] || "/placeholder.png"}
                    alt={property.title}
                    className="w-full h-full object-cover block"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />

                  <PropertyDetails property={property}>
                    <div
                      className="absolute top-2 right-2 z-10 px-3 py-1 text-xs rounded-md shadow bg-white/90 hover:bg-white cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9"
                      style={{ fontWeight: 600 }}
                    >
                      View Details
                    </div>
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
                <div className="p-3 flex flex-col flex-1">
                  <h3
                    className="text-base font-semibold text-gray-900 dark:text-white truncate mb-1"
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
                    className="text-lg font-bold text-primary truncate mb-1"
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
                    className="text-xs text-gray-500 dark:text-gray-300 truncate mb-2"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "24px",
                      maxWidth: "100%",
                    }}
                  >
                    {property.location.address}, {property.location.city},{" "}
                    {property.location.state}, {property.location.country}
                  </div>
                  <div
                    className="flex flex-wrap gap-1 mb-2"
                    style={{ maxHeight: 24, overflow: "hidden" }}
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
                {user.role === "client" ? (
                  <PropertyDetails property={property}>
                    <div className="w-full font-semibold flex items-center justify-center gap-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                      <Mail className="w-4 h-4" /> Inquiry
                    </div>
                  </PropertyDetails>
                ) : (
                  <div className="flex items-center space-x-1">
                    <ConfirmButton
                      onConfirm={() => archiveProperty(property.id)}
                      title="Archive Property"
                      description="Are you sure you want to archive this property?"
                    >
                      <div className="w-full font-semibold flex items-center justify-center gap-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        <Archive className="w-4 h-4" /> Archieve
                      </div>
                    </ConfirmButton>
                    <CreateProperty data={property || null}>
                      <div className="w-full font-semibold flex items-center justify-center gap-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        <Pen className="w-4 h-4" /> Edit
                      </div>
                    </CreateProperty>
                  </div>
                )}
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
    </HandleLayout>
  );
}

interface HandleLayoutProps {
  children: React.ReactNode;
  showLayout: boolean;
  handleReset: () => void;
}

const HandleLayout: React.FC<HandleLayoutProps> = ({
  children,
  showLayout,
  handleReset,
}) => {
  if (showLayout) {
    return (
      <PropertyLayout handleReset={handleReset}>{children}</PropertyLayout>
    );
  } else {
    return <>{children}</>;
  }
};
