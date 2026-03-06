// src/hooks/useNetworkInfo.js
// Detect network type and speed, serve appropriate quality

import React from "react";

export function useNetworkInfo() {
  const [networkInfo, setNetworkInfo] = React.useState({
    effectiveType: "4g", // '4g' | '3g' | '2g' | 'slow-2g'
    downlink: 10,
    rtt: 50,
    saveData: false,
  });

  React.useEffect(() => {
    // Modern Network Information API
    if ("connection" in navigator) {
      const connection = navigator.connection;

      const updateNetworkInfo = () => {
        setNetworkInfo({
          effectiveType: connection.effectiveType || "4g",
          downlink: connection.downlink || 10,
          rtt: connection.rtt || 50,
          saveData: connection.saveData || false,
        });
      };

      updateNetworkInfo();
      connection.addEventListener("change", updateNetworkInfo);

      return () => connection.removeEventListener("change", updateNetworkInfo);
    }
  }, []);

  return {
    ...networkInfo,
    // Determine quality tier
    isSlow:
      networkInfo.effectiveType === "3g" ||
      networkInfo.effectiveType === "2g" ||
      networkInfo.effectiveType === "slow-2g",
    isVerySlow:
      networkInfo.effectiveType === "2g" ||
      networkInfo.effectiveType === "slow-2g",
    isFast: networkInfo.effectiveType === "4g",
  };
}

export function getImageQuality(networkInfo) {
  // Return appropriate image resolution quality
  if (networkInfo.isVerySlow) return "low"; // 480x320
  if (networkInfo.isSlow) return "medium"; // 800x600
  return "high"; // 1200x900+
}

export function getVideoQuality(networkInfo) {
  // Return appropriate video bitrate
  if (networkInfo.isVerySlow) return "mobile"; // 500kbps
  if (networkInfo.isSlow) return "medium"; // 1500kbps
  return "high"; // 3000kbps+
}
