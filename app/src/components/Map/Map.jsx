"use client";

import { useState, useMemo } from "react";
import clsx from "clsx";

const Alert = ({ children, type = "info", className, onClose }) => {
  const alertClasses = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  };

  return (
    <div className={clsx("alert shadow-lg", alertClasses[type], className)}>
      <div className="flex justify-between w-full">
        <span>{children}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close alert"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

const GoogleMapEmbed = ({
  coordinates,
  placeName,
  apiKey,
  zoom = 15,
  maptype = "roadmap",
  className,
  width = "100%",
  height = 450,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatCoordinates = (coords) => {
    if (!coords) return null;

    const coordRegex = /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/;
    const match = coords.match(coordRegex);

    if (match) {
      const [_, lat, lng] = match;
      return `${parseFloat(lat)},${parseFloat(lng)}`;
    }

    const dmsRegex = /(\d+\.?\d*)°\s*([NS]),\s*(\d+\.?\d*)°\s*([EW])/;
    const dmsMatch = coords.match(dmsRegex);

    if (dmsMatch) {
      const [_, lat, ns, lng, ew] = dmsMatch;
      const latitude = parseFloat(lat) * (ns === 'S' ? -1 : 1);
      const longitude = parseFloat(lng) * (ew === 'W' ? -1 : 1);
      return `${latitude},${longitude}`;
    }

    return null;
  };

  const mapSrc = useMemo(() => {
    const formattedCoords = formatCoordinates(coordinates);
    
    if (!formattedCoords) {
      return null;
    }

    let query;
    if (placeName) {
      query = encodeURIComponent(`${placeName} @${formattedCoords}`);
    } else {
      query = encodeURIComponent(formattedCoords);
    }

    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=${zoom}&maptype=${maptype}&center=${formattedCoords}`;
  }, [coordinates, placeName, apiKey, zoom, maptype]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError("Failed to load the map. Please try again later.");
  };

  if (!mapSrc) {
    return (
      <div className="bg-base-200 rounded-lg p-4 text-center">
        Invalid location data provided
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden rounded-lg shadow-lg",
        className
      )}
    >
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 bg-opacity-50 z-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {error && (
        <Alert
          type="error"
          className="absolute top-4 left-4 right-4 z-20"
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <div className="aspect-video w-full">
        <iframe
          width={width}
          height={height}
          className={clsx(
            "w-full h-full rounded-lg transition-opacity duration-300",
            loading && "opacity-0",
            !loading && "opacity-100"
          )}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
          title={`Google Map - ${placeName || coordinates}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default GoogleMapEmbed;
