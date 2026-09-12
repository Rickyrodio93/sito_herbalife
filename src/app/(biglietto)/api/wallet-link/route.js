import { NextResponse } from "next/server";
import { creaLinkGoogleWallet } from "@/lib/googleWallet";

export async function GET() {
    try {
        const link = creaLinkGoogleWallet();
        return NextResponse.json({url: link});
    } catch (e) {
        console.error("Errore generatore Wallet:", e);
        return NextResponse.json(
            { error: "Impossibile generare il pass." },
            { status: 500 }
        );
    }
}