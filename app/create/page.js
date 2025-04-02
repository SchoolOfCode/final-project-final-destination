"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventForm from "../src/components/Form/Form";

const MessageBox = ({ isSuccess }) => {
  return (
    <div className="flex justify-center mt-12">
      <div
        className={`p-4 w-full max-w-sm text-white rounded-md shadow-lg text-center ${
          isSuccess ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isSuccess
          ? "Form submitted successfully!"
          : "There was an error submitting the form."}
      </div>
    </div>
  );
};

const UnauthorizedMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-4">You must be logged in to create events.</p>
        <a
          href="/login"
          className="block w-full bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Log In
        </a>
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  );
};

export default function NewEvent() {
  const { data: session, status } = useSession();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [places, setPlaces] = useState([]);
  const [selectedBorough, setSelectedBorough] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.id) {
      checkOrganizerStatus();
      fetchPlaces();
    }
  }, [status, session, router]);

  const fetchPlaces = async () => {
    try {
      const response = await fetch("/api/event");
      if (response.ok) {
        const data = await response.json();
        setPlaces(data);
        const uniqueBoroughs = [...new Set(data.map((place) => place.borough))].sort();
        setSelectedBorough(uniqueBoroughs[0] || "");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const checkOrganizerStatus = async () => {
    try {
      const response = await fetch(`/api/user/${session.user.id}/organizer-status`);
      if (response.ok) {
        const data = await response.json();
        setIsOrganizer(data.is_organizer);
      }
    } catch (error) {
      console.error("Error checking organizer status:", error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const submitForm = () => {
    setFormSubmitted(true);
  };

  const filteredPlaces = selectedBorough
    ? places.filter((place) => place.borough === selectedBorough)
    : places;

  if (status === "loading" || isCheckingStatus) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <UnauthorizedMessage />;
  }

  if (!isOrganizer) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 mb-4">
            Only organizers can create events. Please visit your settings page to apply for organizer status.
          </p>
          <a
            href="/settings"
            className="block w-full bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Go to Settings
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {formSubmitted ? (
        <MessageBox isSuccess={true} />
      ) : (
        <EventForm
          submitForm={submitForm}
          session={session}
          places={filteredPlaces}
          boroughs={[...new Set(places.map((place) => place.borough))].sort()}
          selectedBorough={selectedBorough}
          onBoroughChange={setSelectedBorough}
        />
      )}
    </>
  );
}
