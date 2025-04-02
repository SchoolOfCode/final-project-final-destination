"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleMapEmbed from "@/app/src/components/Map/Map";

export default function EventPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [eventData, setEventData] = useState({});
  const [attendeeData, setAttendeeData] = useState([]);
  const [isAttending, setIsAttending] = useState(false);
  const [userChildren, setUserChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [error, setError] = useState(null);

  const getEventData = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/event/${params.eventId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const event_data = await response.json();
      setEventData(event_data);
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };

  const getAttendeeData = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/attendees/${params.eventId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const attendeeDataRes = await response.json();
      setAttendeeData(attendeeDataRes);
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };

  const getUserChildren = async () => {
    try {
      const response = await fetch('/api/children');
      if (!response.ok) throw new Error('Failed to fetch children');
      const children = await response.json();
      setUserChildren(children);
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  const attendMatch = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (userChildren.length === 0) {
      router.push("/settings");
      alert("Please add a child in settings before attending an event");
      return;
    }

    if (!selectedChildId && userChildren.length > 0) {
      setError("Please select a child to attend the event");
      return;
    }

    try {
      const response = await fetch(`${window.location.origin}/api/attendees/${params.eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: session.user.id,
          child_id: selectedChildId,
          meetup_id: parseInt(params.eventId),
          status: "confirmed"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to attend event");
      }

      await getAttendeeData();
      setIsAttending(true);
      setError(null);
    } catch (error) {
      console.error("There was a problem attending the event:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getEventData();
    getAttendeeData();
    if (session?.user?.id) {
      getUserChildren();
    }
  }, [session]);

  if (!eventData) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 rounded-xl space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">{eventData.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <Image
              src="/coach.jpg"
              alt="Football coach"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h4 className="text-lg font-semibold">{eventData.organizer_name || "Coach"}</h4>
              <p className="text-gray-600">
                Experienced football coach, fully DBS-checked and first aid trained.
              </p>
            </div>
          </div>
        </div>

        <div>
          <GoogleMapEmbed 
            placeName={eventData.place_name} 
            coordinates={eventData.place_coordinates} 
            apiKey="AIzaSyChnsFQpUbqk6lFv11umTxkcoU4Xszrs_g" 
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-2">Event Details</h4>
          <div className="space-y-2">
            <p><i className="bi bi-calendar-heart"></i> {dayjs(eventData.date).format("MMMM D, YYYY")}</p>
            <p><i className="bi bi-clock"></i> {eventData.time_period}</p>
            <p><i className="bi bi-geo-alt"></i> {eventData.place_name}</p>
            <p><i className="bi bi-pin-map"></i> {eventData.place_borough}</p>
            <p><i className="bi bi-people"></i> Age Group: {eventData.age_group}</p>
            <p><i className="bi bi-person-up"></i> Max Participants: {eventData.max_participants}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">About This Event</h4>
          <p className="mb-4">{eventData.description}</p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Skill Level:</span>
              <span className="capitalize">{eventData.skill_level}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Parking Available:</span>
              <span>{eventData.place_parking ? "Yes" : "No"}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Toilets Available:</span>
              <span>{eventData.place_toilets ? "Yes" : "No"}</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">
            Attendees ({attendeeData.length}/{eventData.max_participants})
          </h4>
          {attendeeData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attendeeData.map((attendee) => (
                <div
                  key={attendee.attendee_id}
                  className="flex justify-between bg-green-100 p-4 rounded-lg shadow"
                >
                  <p>👤 {attendee.parent_name}</p>
                  <p>👶 {attendee.child_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No attendees yet - be the first to join!</p>
          )}

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}

          {session && !isAttending && userChildren.length > 0 && (
            <div className="mt-4">
              <select
                className="select select-bordered w-full mb-4"
                value={selectedChildId || ""}
                onChange={(e) => setSelectedChildId(Number(e.target.value))}
              >
                <option value="">Select a child</option>
                {userChildren.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.first_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={attendMatch}
              className={`btn w-full ${
                isAttending
                  ? "btn-disabled bg-gray-400"
                  : attendeeData.length >= eventData.max_participants
                  ? "btn-disabled bg-gray-400"
                  : "btn-primary"
              }`}
              disabled={isAttending || attendeeData.length >= eventData.max_participants}
            >
              {isAttending
                ? "You're Attending"
                : attendeeData.length >= eventData.max_participants
                ? "Event Full"
                : !session
                ? "Login to Join Event"
                : userChildren.length === 0
                ? "Add Child in Settings to Join"
                : "Join Event"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-white p-4 rounded-lg shadow mt-6">
        <h3 className="text-xl font-semibold">Comments</h3>
        <p className="text-gray-600">Share your thoughts about this event</p>
        <div>
          <input
            type="text"
            placeholder="Write a comment..."
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
}
