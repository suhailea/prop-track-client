import React from "react";
import LeafletMap from "./Map";
import PropertyList from "./PropertyList";

const PropertySearch: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        gap: "1rem",
      }}
      className="property-search-container"
    >
      <div
        style={{ flex: 1, minWidth: 0 }}
        className="property-search-map"
      >
        <LeafletMap />
      </div>
      <div
        style={{ flex: 1, minWidth: 0, overflowY: "auto" }}
        className="property-search-list"
      >
        <PropertyList showLayout={false}/>
      </div>
    </div>
  );
};

export default PropertySearch;

// Responsive styles (can be moved to a CSS/SCSS file)
const style = document.createElement('style');
style.innerHTML = `
  @media (max-width: 768px) {
    .property-search-container {
      flex-direction: column !important;
    }
    .property-search-map, .property-search-list {
      min-width: 0 !important;
      width: 100% !important;
      height: 50vh !important;
    }
  }
`;
document.head.appendChild(style); 