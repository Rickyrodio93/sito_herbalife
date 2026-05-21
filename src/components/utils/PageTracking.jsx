"use client"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageTracking(){
    const location = useLocation();

    useEffect(() =>{
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "pageview",
            page_path: location.pathname,
        });
    }, [location.pathname])

    return null
}