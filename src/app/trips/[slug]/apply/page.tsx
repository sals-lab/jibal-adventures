"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const dynamic = "force-dynamic";

// =============================================================================
// APPLICATION FORM PAGE - With Phone Number Input
// =============================================================================

interface TripDate {
  id: string;
  startDate: string;
  endDate: string;
  price: number | null;
  spotsLeft: number;
  status: string;
}

interface Trip {
  id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
  difficulty: string;
  continent: string;
  photos: { url: string }[];
  tripDates: TripDate[];
}

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportPhoto: string;
  fitnessLevel: string;
  experience: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  allergies: string;
  medications: string;
  dietaryRestrictions: string;
  howDidYouHear: string;
  termsSignature: string;
  termsAccepted: boolean;
}

const initialFormData: FormData = {
  customerName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  nationality: "",
  passportPhoto: "",
  fitnessLevel: "",
  experience: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelation: "",
  allergies: "",
  medications: "",
  dietaryRestrictions: "",
  howDidYouHear: "",
  termsSignature: "",
  termsAccepted: false,
};

const fitnessLevels = ["Beginner", "Intermediate", "Advanced", "Athlete"];
const howDidYouHearOptions = [
  "Instagram",
  "TikTok",
  "Friend/Family referral",
  "Google search",
  "YouTube",
  "Other",
];

export default function ApplicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const departureId = searchParams.get("departure");

  const [slug, setSlug] = useState<string>("");
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<TripDate | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Fetch trip data
  useEffect(() => {
    async function loadData() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);

      try {
        const response = await fetch(`/api/trips/${resolvedParams.slug}`);
        if (!response.ok) throw new Error("Trip not found");

        const result = await response.json(); // ✅ Changed
        const tripData = result.data; // ✅ Extract data

        if (!tripData) throw new Error("Trip not found");

        setTrip(tripData); // ✅ Set extracted data

        // If departure ID is in URL, select that departure
        if (departureId && tripData.tripDates) {
          const departure = tripData.tripDates.find(
            (d: TripDate) => d.id === departureId
          );

          if (departure) setSelectedDeparture(departure);
        }
      } catch (err) {
        console.error("Error loading trip:", err);
        setError("Failed to load trip details");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params, departureId]);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeparture) {
      setError("Please select a departure date");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          departureId: selectedDeparture.id, // ✅ Changed from tripDateId to departureId
          // Removed tripId - backend doesn't need it
        }),
      });

      if (!res.ok) {
        const data = await res.json();

        // Enhanced error parsing
        let errorMessage = "Failed to submit application";

        // Handle validation errors
        if (data.details?.fields && Array.isArray(data.details.fields)) {
          errorMessage =
            "Please fix the following errors:\n" +
            data.details.fields
              .map((err: any) => {
                if (typeof err === "string") return `• ${err}`;
                if (err.field && err.message)
                  return `• ${err.field}: ${err.message}`;
                return `• ${JSON.stringify(err)}`;
              })
              .join("\n");
        } else if (typeof data.error === "string") {
          errorMessage = data.error;
        } else if (data.message) {
          errorMessage = data.message;
        }

        console.error("Application submission error:", data);
        throw new Error(errorMessage);
      }

      const result = await res.json();

      // Success - redirect to success page
      router.push(`/trips/${slug}/apply/success`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#BABCA7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#5A6666]">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-[#121E1E] mb-4">Trip not found</p>
          <Link href="/trips" className="text-[#BABCA7] hover:underline">
            Browse all trips
          </Link>
        </div>
      </div>
    );
  }

  const primaryPhoto = trip.photos?.[0]?.url || "/placeholder-trip.jpg";

  return (
    <div className="min-h-screen bg-[#F2F2F2] pb-16">
      {/* Trip Header */}
      <section className="bg-white border-b border-[#E8E8E8]">
        <Container className="py-8">
          <Link
            href={`/trips/${slug}`}
            className="inline-flex items-center gap-2 text-[#5A6666] hover:text-[#121E1E] transition-colors mb-6"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to trip details
          </Link>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#E8E8E8] flex-shrink-0">
              <img
                src={primaryPhoto}
                alt={trip.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#121E1E] mb-2">
                Apply for {trip.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-[#5A6666]">
                <span>{trip.duration} days</span>
                <span>•</span>
                <span>{trip.difficulty}</span>
                <span>•</span>
                <span>${trip.price}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Form */}
      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          {/* Departure Selection */}
          <div className="bg-white rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-[#121E1E] mb-4">
              Select Your Departure Date
            </h2>
            {trip.tripDates && trip.tripDates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trip.tripDates
                  .sort(
                    (a, b) =>
                      new Date(a.startDate).getTime() -
                      new Date(b.startDate).getTime()
                  ) // ✅ Sort by date
                  .map((date) => (
                    <button
                      key={date.id}
                      type="button"
                      onClick={() => setSelectedDeparture(date)}
                      disabled={
                        (date.status !== "open" && date.status !== "limited") || // ✅ Fixed capitalization
                        date.spotsLeft === 0
                      }
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedDeparture?.id === date.id
                          ? "border-[#BABCA7] bg-[#BABCA7]/10"
                          : (date.status === "open" ||
                              date.status === "limited") &&
                            date.spotsLeft > 0 // ✅ Fixed here too
                          ? "border-[#E8E8E8] hover:border-[#BABCA7]"
                          : "border-[#E8E8E8] opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#121E1E]">
                          {new Date(date.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                        {selectedDeparture?.id === date.id && (
                          <svg
                            className="w-5 h-5 text-[#BABCA7]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="text-sm text-[#5A6666]">
                        {date.spotsLeft} spots left • $
                        {date.price || trip.price}
                      </div>
                    </button>
                  ))}
              </div>
            ) : (
              <p className="text-[#5A6666]">No departure dates available</p>
            )}
          </div>
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-red-900 mb-2">
                    Application Error
                  </p>
                  <div className="text-red-700 text-sm whitespace-pre-line">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <FormSection
              icon={<UserIcon />}
              title="Personal Information"
              description="Tell us about yourself"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  value={formData.customerName}
                  onChange={(v) => updateFormData("customerName", v)}
                  placeholder="Enter your full legal name"
                  required
                />
                <InputField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(v) => updateFormData("email", v)}
                  placeholder="your.email@example.com"
                  required
                />
                {/* Phone Input with Country Selector */}
                <PhoneInputField
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(v) => updateFormData("phone", v || "")}
                  required
                />
                <InputField
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(v) => updateFormData("dateOfBirth", v)}
                  required
                />
                <InputField
                  label="Nationality"
                  value={formData.nationality}
                  onChange={(v) => updateFormData("nationality", v)}
                  placeholder="Enter your nationality"
                  required
                  className="md:col-span-2"
                />
              </div>
            </FormSection>

            {/* Travel Documents */}
            <FormSection
              icon={<PassportIcon />}
              title="Travel Documents"
              description="Essential documentation for your journey"
            >
              <div>
                <label className="block text-sm font-semibold text-[#121E1E] mb-2">
                  Passport Photo <span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Convert to base64
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        updateFormData(
                          "passportPhoto",
                          reader.result as string
                        );
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#BABCA7] focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#BABCA7] file:text-[#121E1E] hover:file:bg-[#D1D3C4]"
                />
                <p className="text-xs text-[#5A6666] mt-2 flex items-center gap-1">
                  <InfoIcon className="w-3 h-3" />
                  Upload a clear photo of your passport information page (JPG,
                  PNG, or PDF). Your passport must be valid for at least 6
                  months beyond your travel dates.
                </p>
              </div>
            </FormSection>
            {/* Fitness & Experience */}
            <FormSection
              icon={<FitnessIcon />}
              title="Fitness & Experience"
              description="Help us understand your adventure readiness"
            >
              <SelectField
                label="Fitness Level"
                value={formData.fitnessLevel}
                onChange={(v) => updateFormData("fitnessLevel", v)}
                options={fitnessLevels}
                placeholder="Select your fitness level"
                required
              />
              <TextareaField
                label="Previous Adventure Experience"
                value={formData.experience}
                onChange={(v) => updateFormData("experience", v)}
                placeholder="Tell us about your hiking, trekking, or mountaineering experience. Include any relevant trips, challenges you've completed, or training you've undertaken."
                rows={4}
                optional
              />
              <p className="text-xs text-[#5A6666]">
                This helps us better prepare for your journey and ensure the
                best experience.
              </p>
            </FormSection>

            {/* Emergency Contact */}
            <FormSection
              icon={<EmergencyIcon />}
              title="Emergency Contact"
              description="Someone we can reach in case of emergency"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Emergency Contact Name"
                  value={formData.emergencyContactName}
                  onChange={(v) => updateFormData("emergencyContactName", v)}
                  placeholder="Full name of emergency contact"
                  required
                  className="md:col-span-2"
                />
                {/* Emergency Phone Input with Country Selector */}
                <PhoneInputField
                  label="Emergency Contact Phone"
                  value={formData.emergencyContactPhone}
                  onChange={(v) =>
                    updateFormData("emergencyContactPhone", v || "")
                  }
                  required
                />
                <InputField
                  label="Relationship to You"
                  value={formData.emergencyContactRelation}
                  onChange={(v) =>
                    updateFormData("emergencyContactRelation", v)
                  }
                  placeholder="e.g., Mother, Spouse, Friend"
                  required
                />
              </div>
            </FormSection>

            {/* Health & Dietary */}
            <FormSection
              icon={<HealthIcon />}
              title="Health & Dietary Requirements"
              description="Help us accommodate your needs"
            >
              <div className="space-y-6">
                <TextareaField
                  label="Allergies"
                  value={formData.allergies}
                  onChange={(v) => updateFormData("allergies", v)}
                  placeholder="If none, write N/A"
                  rows={2}
                  required
                />
                <TextareaField
                  label="Current Medications"
                  value={formData.medications}
                  onChange={(v) => updateFormData("medications", v)}
                  placeholder="If none, write N/A"
                  rows={2}
                  required
                />
                <TextareaField
                  label="Dietary Restrictions"
                  value={formData.dietaryRestrictions}
                  onChange={(v) => updateFormData("dietaryRestrictions", v)}
                  placeholder="Vegetarian, Vegan, Gluten-free, etc. If none, write N/A"
                  rows={2}
                  required
                />
              </div>
            </FormSection>
            {/* Additional Info */}
            <FormSection
              icon={<InfoIcon />}
              title="Additional Information"
              description="Help us improve our service"
            >
              <SelectField
                label="How did you hear about us?"
                value={formData.howDidYouHear}
                onChange={(v) => updateFormData("howDidYouHear", v)}
                options={howDidYouHearOptions}
                placeholder="Select an option"
                required
              />
            </FormSection>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#121E1E]">
                  Terms & Conditions
                </h3>
                <div className="text-sm text-[#5A6666] space-y-2 max-h-48 overflow-y-auto p-4 bg-[#F2F2F2] rounded-xl">
                  <p>
                    By applying for this trip, you acknowledge and agree to the
                    following:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>All information provided is accurate and complete</li>
                    <li>
                      You meet the physical requirements for this adventure
                    </li>
                    <li>You have disclosed all relevant medical conditions</li>
                    <li>
                      You understand the risks involved in adventure travel
                    </li>
                    <li>You agree to follow all safety guidelines provided</li>
                    <li>Cancellation policy applies as per our terms</li>
                  </ul>
                </div>

                <InputField
                  label="Digital Signature"
                  value={formData.termsSignature}
                  onChange={(v) => updateFormData("termsSignature", v)}
                  placeholder="Type your full name to sign"
                  required
                />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      updateFormData("termsAccepted", e.target.checked)
                    }
                    required
                    className="mt-1 w-4 h-4 rounded border-[#E8E8E8] text-[#BABCA7] focus:ring-[#BABCA7]"
                  />
                  <span className="text-sm text-[#5A6666]">
                    I have read and agree to the terms and conditions, and I
                    acknowledge that my digital signature above represents my
                    legal agreement to these terms.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || !selectedDeparture}
              className="w-full px-8 py-4 bg-[#BABCA7] text-[#121E1E] font-semibold rounded-xl hover:bg-[#D1D3C4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

// =============================================================================
// FORM COMPONENTS
// =============================================================================

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#BABCA7]/30 flex items-center justify-center text-[#121E1E]">
          {icon}
        </div>
        <div>
          <h2 className="font-semibold text-[#121E1E]">{title}</h2>
          <p className="text-sm text-[#5A6666]">{description}</p>
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  optional = false,
  className = "",
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-[#121E1E] mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
        {optional && (
          <span className="text-[#5A6666] font-normal ml-1">(Optional)</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#BABCA7] focus:border-transparent transition-all"
      />
    </div>
  );
}

function PhoneInputField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string | undefined) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#121E1E] mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <PhoneInput
        international
        defaultCountry="KW"
        value={value}
        onChange={onChange}
        className="phone-input-custom"
      />
      <style jsx global>{`
        .phone-input-custom {
          width: 100%;
        }
        .phone-input-custom .PhoneInputInput {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e8e8e8;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .phone-input-custom .PhoneInputInput:focus {
          outline: none;
          border-color: transparent;
          box-shadow: 0 0 0 2px #babca7;
        }
        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#121E1E] mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#BABCA7] focus:border-transparent transition-all"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#121E1E] mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
        {optional && (
          <span className="text-[#5A6666] font-normal ml-1">(Optional)</span>
        )}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#BABCA7] focus:border-transparent transition-all resize-none"
      />
    </div>
  );
}

// =============================================================================
// ICONS
// =============================================================================

function UserIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function PassportIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function FitnessIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

function EmergencyIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function HealthIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function InfoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
