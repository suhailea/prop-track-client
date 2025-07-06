import { useEffect, useState } from "react";
import { useApi } from "./useApi";

export function useAminities() {
  const { makeRequest, data } = useApi<string[]>();
  const [amenities, setAmenities] = useState<string[]>();

  useEffect(() => {
    makeRequest(`/api/agent/properties/amenities`);
  }, [makeRequest]);

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) setAmenities(data || []);
      else setAmenities([]);
    }
  }, [data]);

  return { amenities };
}
