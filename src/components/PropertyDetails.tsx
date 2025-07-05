import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { z } from "zod";
import { useApi } from "@/hooks/useApi";
import { Ruler, Bath, Bed, Calendar, FileText, Tag, Home as HomeIcon } from "lucide-react";

interface PropertyLocation {
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  country: string;
  state: string;
}

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

interface PropertyDetailsProps {
  property: Property;
  children: React.ReactNode;
}

const inquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().optional(),
});

type InquiryForm = z.infer<typeof inquirySchema>;

export function PropertyDetails({ property, children }: PropertyDetailsProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [form, setForm] = useState<InquiryForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof InquiryForm, string>>
  >({});
  const { makeRequest, loading, data } = useApi();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InquiryForm, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0])
          fieldErrors[err.path[0] as keyof InquiryForm] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    await makeRequest("/api/inquiry/create", {
      method: "POST",
      body: {
        propertyId: property.id,
        ...form,
      },
    });
  };

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="max-w-4xl mx-auto p-0 h-full">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left: Images and Details */}
          <div className="flex-1 p-6 h-[70vh] max-h-[600px] overflow-y-auto">
            {/* Image Carousel */}
            <div className="w-full mb-4">
              <div className="relative w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Left Arrow */}
                {property.images.length > 1 && (
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow border border-gray-200 z-10"
                    onClick={() =>
                      setActiveImg((prev) => Math.max(0, prev - 1))
                    }
                    disabled={activeImg === 0}
                    aria-label="Previous image"
                  >
                    <span className="text-xl">&#8592;</span>
                  </button>
                )}
                <img
                  src={property.images[activeImg] || "/placeholder.png"}
                  alt={property.title}
                  className="object-cover w-full h-full rounded-lg"
                />
                {/* Right Arrow */}
                {property.images.length > 1 && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow border border-gray-200 z-10"
                    onClick={() =>
                      setActiveImg((prev) =>
                        Math.min(property.images.length - 1, prev + 1)
                      )
                    }
                    disabled={activeImg === property.images.length - 1}
                    aria-label="Next image"
                  >
                    <span className="text-xl">&#8594;</span>
                  </button>
                )}
                {property.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {property.images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-3 h-3 rounded-full border-2 ${
                          activeImg === idx
                            ? "bg-primary border-primary"
                            : "bg-white border-gray-300"
                        }`}
                        onClick={() => setActiveImg(idx)}
                        aria-label={`Show image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Property Info */}
            <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Ruler className="w-5 h-5" />
                <span>{property.areaSqFt} sq ft</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Bath className="w-5 h-5" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Bed className="w-5 h-5" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Calendar className="w-5 h-5" />
                <span>{property.createdAt ? new Date(property.createdAt).toLocaleDateString() : "-"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 col-span-2">
                <FileText className="w-5 h-5" />
                <span>{property.description}</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Tag className="w-5 h-5" />
                <span>{property.price}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-bold">
                <HomeIcon className="w-5 h-5" />
                <span>{property.type}</span>
              </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300 mb-2">
              {property.location.address}, {property.location.city},{" "}
              {property.location.state}, {property.location.country}
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Amenities:</div>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-1 rounded-full text-gray-700 dark:text-gray-200"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Inquiry Form */}
          <div className="w-full md:w-96 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex flex-col h-[70vh] max-h-[600px]">
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-lg font-bold mb-4">Send Inquiry</h3>
              {data ? (
                <div className="text-green-600 font-semibold">
                  Thank you for your inquiry!
                </div>
              ) : (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className={`border rounded px-3 py-2 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">{errors.name}</span>
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className={`border rounded px-3 py-2 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email}</span>
                  )}
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    className={`border rounded px-3 py-2 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">{errors.phone}</span>
                  )}
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="border rounded px-3 py-2"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                  />
                </form>
              )}
            </div>
            <DrawerFooter className="sticky bottom-0 left-0 right-0 bg-gray-50 dark:bg-gray-900 p-6 z-10">
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Send Inquiry"}
              </Button>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
