import { useEffect, useState } from "react";

// Hook sederhana untuk deteksi layar mobile (breakpoint 768px),
// dipakai DashboardLayout untuk auto-collapse sidebar.
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
