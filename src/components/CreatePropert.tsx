import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useAminities } from "@/hooks/useAminities";
import { useApi } from "@/hooks/useApi";

// Validation schema for the property form
const propertyFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  type: z.string().min(1, "Property type is required"),
  status: z.string().min(1, "Status is required"),
  bedrooms: z.number().min(0, "Bedrooms must be 0 or more"),
  bathrooms: z.number().min(0, "Bathrooms must be 0 or more"),
  areaSqFt: z.number().min(1, "Area is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  images: z.any().optional(), // Json field for images
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    coordinates: z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    }),
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const propertyTypes = [
  "House",
  "Apartment",
  "Condo",
  "Townhouse",
  "Villa",
  "Cottage",
  "Studio",
  "Loft",
  "Penthouse",
  "Duplex",
];

const propertyStatuses = [
  "For Sale",
  "For Rent",
  "Sold",
  "Rented",
  "Under Contract",
  "Pending",
];

export default function CreateProperty({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<PropertyFormValues>>({});
  const { amenities } = useAminities();
  const { makeRequest, loading: submitLoading, error } = useApi();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      type: "",
      status: "",
      bedrooms: 0,
      bathrooms: 0,
      areaSqFt: 0,
      amenities: [],
      images: null,
      location: {
        address: "",
        city: "",
        state: "",
        country: "",
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
    console.log("Form Data:", data);

    try {
      // Prepare the data according to the model structure
      const propertyData = {
        title: data.title,
        description: data.description,
        price: data.price,
        type: data.type,
        status: data.status,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        areaSqFt: data.areaSqFt,
        amenities: data.amenities,
        images: data.images || null,
        location: {
          address: data.location.address,
          city: data.location.city,
          state: data.location.state,
          country: data.location.country,
          coordinates: {
            lat: data.location.coordinates.latitude,
            lng: data.location.coordinates.longitude,
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await makeRequest("/api/agent/create-property", {
        method: "POST",
        body: propertyData,
      });

      if (!error) {
        // Reset form and close sheet on success
        form.reset();
        setCurrentStep(1);
        setSelectedAmenities([]);
        setFormData({});
      }
      // You can add a success notification here
      alert("Property created successfully!");
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property. Please try again.");
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    let newAmenities: string[];

    if (checked) {
      newAmenities = [...selectedAmenities, amenity];
    } else {
      newAmenities = selectedAmenities.filter((a) => a !== amenity);
    }

    setSelectedAmenities(newAmenities);
    form.setValue("amenities", newAmenities);
  };

  const handleNextStep = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate: (keyof PropertyFormValues)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "title",
          "description",
          "price",
          "type",
          "status",
          "images",
        ];
        break;
      case 2:
        fieldsToValidate = ["bedrooms", "bathrooms", "areaSqFt"];
        break;
      case 3:
        fieldsToValidate = ["location"];
        break;
      case 4:
        fieldsToValidate = ["amenities"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep(currentStep + 1);
      setFormData({ ...formData, ...form.getValues() });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    // Validate all fields before final submission
    const isValid = await form.trigger();

    if (isValid) {
      const formValues = form.getValues();
      console.log("Submitting form with values:", formValues);
      await onSubmit(formValues);
    } else {
      console.log("Form validation failed:", form.formState.errors);
      // Optionally show which fields are invalid
      const errors = form.formState.errors;
      console.log("Validation errors:", errors);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Enter the basic details of the property
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter property title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter detailed description of the property"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {propertyStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      // Convert files to base64 or handle as needed
                      const fileArray = Array.from(files);
                      field.onChange(fileArray);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Property Details</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Specify the property specifications
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="areaSqFt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area (sq ft)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Location</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Enter the property location details
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="location.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter full address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location.coordinates.latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="0.000000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.coordinates.longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="0.000000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Amenities</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select the amenities available in this property
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
        {amenities &&
          amenities?.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={(checked) =>
                  handleAmenityChange(amenity, checked as boolean)
                }
              />
              <Label htmlFor={amenity} className="text-sm font-normal">
                {amenity}
              </Label>
            </div>
          ))}
      </div>
      <FormMessage>{form.formState.errors.amenities?.message}</FormMessage>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex space-x-2">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step < currentStep
                ? "bg-green-500 text-primary-foreground"
                : step === currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <span className="text-xs font-semibold">
              {step < currentStep ? "✓" : step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Sheet
      onOpenChange={() => {
        setCurrentStep(1);
        form.reset();
        setSelectedAmenities([]);
        setFormData({});
      }}
    >
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-[600px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Property</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new property listing
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {renderStepIndicator()}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}

              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousStep}
                  >
                    Previous
                  </Button>
                )}

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="ml-auto"
                    disabled={submitLoading}
                  >
                    {submitLoading ? "Creating..." : "Create Property"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
