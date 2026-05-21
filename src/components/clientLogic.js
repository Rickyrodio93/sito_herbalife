"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientLogic() {
    const pathname = usePathname();

    useEffect(() => {
        // 1. Riporta lo scroll in alto
        window.scrollTo(0, 0);

        // 2. COMUNICA IL CAMBIO PAGINA A GOOGLE TAG MANAGER
        if (typeof window !== "undefined" && window.dataLayer) {
            window.dataLayer.push({
                event: "pageview", // Questo evento deve essere registrato su GTM come trigger
                page: pathname,
            });
        }

    }, [pathname]); // Si attiva ogni volta che l'utente cambia rotta

    return null;
}