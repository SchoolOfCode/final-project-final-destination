"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [children, setChildren] = useState([]);
  const [newChildName, setNewChildName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [organizerStatus, setOrganizerStatus] = useState("none");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.id) {
      fetchChildren();
      fetchOrganizerStatus();
    }
  }, [session, status]);

  const fetchOrganizerStatus = async () => {
    try {
      const response = await fetch(`/api/user/${session.user.id}/organizer-status`);
      if (!response.ok) throw new Error("Failed to fetch organizer status");
      const data = await response.json();
      setOrganizerStatus(data.is_organizer ? "approved" : "none");
    } catch (err) {
      console.error("Failed to fetch organizer status:", err);
    }
  };

  const handleOrganizerApplication = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/user/${session.user.id}/apply-organizer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to submit application");
      setOrganizerStatus("pending");
    } catch (err) {
      setError("Failed to submit organizer application");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await fetch(`/api/children`);
      if (!response.ok) throw new Error("Failed to fetch children");
      const data = await response.json();
      setChildren(data);
    } catch (err) {
      setError("Failed to load children");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChild = async (e) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    try {
      const response = await fetch("/api/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: newChildName.trim(),
          user_id: session.user.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to add child");

      const newChild = await response.json();
      setChildren([...children, newChild]);
      setNewChildName("");
    } catch (err) {
      setError("Failed to add child");
      console.error(err);
    }
  };

  const handleDeleteChild = async (childId) => {
    try {
      const response = await fetch(`/api/children/${childId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete child");

      setChildren(children.filter((child) => child.id !== childId));
    } catch (err) {
      setError("Failed to delete child");
      console.error(err);
    }
  };

  const renderOrganizerSection = () => {
    switch (organizerStatus) {
      case "approved":
        return (
          <div className="alert alert-success">
            <i className="bi bi-check-circle-fill"></i>
            <span>Congratulations! You are now an approved organizer</span>
          </div>
        );
      case "pending":
        return (
          <div className="alert alert-info">
            <i className="bi bi-hourglass-split"></i>
            <div className="flex flex-col">
              <span>Your application is being processed.</span>
              <span className="text-sm mt-2">
                (Demo: Refresh this page in 30 seconds to see your approved status)
              </span>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <p className="text-gray-600">
              Become an organizer to create and manage football events. This requires:
            </p>
            <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
              <li>Valid DBS check</li>
              <li>First aid certification</li>
              <li>Football coaching qualifications</li>
              <li>Public liability insurance</li>
            </ul>
            <button
              onClick={handleOrganizerApplication}
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Processing Application...
                </>
              ) : (
                "Apply to Become an Organizer"
              )}
            </button>
          </div>
        );
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {session?.user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {session?.user?.email}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Organizer Status</h2>
          {renderOrganizerSection()}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Manage Children</h2>
          
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAddChild} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder="Enter child's first name"
                className="input input-bordered flex-1"
                required
              />
              <button type="submit" className="btn btn-primary">
                Add Child
              </button>
            </div>
          </form>

          {children.length > 0 ? (
            <div className="space-y-2">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="flex justify-between items-center p-3 bg-base-100 rounded-lg border"
                >
                  <span>{child.first_name}</span>
                  <button
                    onClick={() => handleDeleteChild(child.id)}
                    className="btn btn-ghost btn-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No children added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
