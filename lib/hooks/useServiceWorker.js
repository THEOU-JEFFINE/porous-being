// src/hooks/useServiceWorker.js
// Hook to register and manage service worker

import { useEffect } from "react";

export function useServiceWorker() {
  useEffect(() => {
    // Only register service worker in production or if explicitly enabled
    const isProduction = process.env.NODE_ENV === "production";
    const isEnabled =
      localStorage.getItem("sw-enabled") === "true" || isProduction;

    if (!isEnabled || !("serviceWorker" in navigator)) {
      if (process.env.NODE_ENV === "development") {
        console.log("Service Worker registration disabled");
      }
      return;
    }

    const registerServiceWorker = async () => {
      try {
        if (process.env.NODE_ENV === "development") {
          console.log("Attempting to register Service Worker...");
        }

        const registration = await navigator.serviceWorker.register(
          "/service-worker.js",
          {
            scope: "/",
          },
        );

        if (process.env.NODE_ENV === "development") {
          console.log("Service Worker registered successfully:", registration);
        }

        // Listen for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker available
              console.log("New Service Worker available");
              // You can notify the user to refresh
            }
          });
        });
      } catch (error) {
        console.warn("Service Worker registration failed:", error);
      }
    };

    // Register after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(registerServiceWorker, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
}

/**
 * Unregister all service workers (useful for debugging)
 */
export async function unregisterServiceWorkers() {
  if ("serviceWorker" in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log("Service Worker unregistered");
      }
    } catch (error) {
      console.warn("Error unregistering Service Worker:", error);
    }
  }
}

/**
 * Check if service worker is active
 */
export async function isServiceWorkerActive() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    return !!registration && !!registration.active;
  }
  return false;
}
