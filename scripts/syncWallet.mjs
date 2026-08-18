import fs from "fs";
import path from "path";
import { google } from "googleapis";
import dotenv from "dotenv";

// Carica le variabili d'ambiente
dotenv.config({ path: ".env" });

const ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID;
const CLASS_ID = `${ISSUER_ID}.biglietto_generico`;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_WALLET_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_WALLET_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!ISSUER_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    console.error("❌ Errore: Variabili d'ambiente mancanti nel file .env");
    process.exit(1);
}

const auth = new google.auth.JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
});

async function sincronizzaWallet() {
    try {
        const jsonPath = path.resolve("./walletTemplate.json");
        const templateData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

        // Assicuriamo l'ID della classe nel payload
        templateData.id = CLASS_ID;

        console.log(`🔄 Invio PATCH a Google Wallet API per la classe ${CLASS_ID}...`);

        // Utilizziamo auth.request direttamente per inviare il payload JSON grezzo
        const response = await auth.request({
            url: `https://walletobjects.googleapis.com/walletobjects/v1/genericClass/${encodeURIComponent(CLASS_ID)}`,
            method: "PUT",
            data: templateData,
        });

        console.log("✅ Sincronizzazione completata con successo!");
        console.log(`📱 Status Google API: ${response.status} ${response.statusText}`);
        console.log(`📱 Le modifiche apportate a '${jsonPath}' sono state applicate alla classe '${CLASS_ID}'.`);
    } catch (error) {
        console.error(
            "❌ Errore durante la sincronizzazione:",
            error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message
        );
    }
}

sincronizzaWallet();