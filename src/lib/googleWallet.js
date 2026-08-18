import jwt from "jsonwebtoken";
import walletTemplate from "../../walletTemplate.json"

const ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID;
const CLASS_ID = `${ISSUER_ID}.biglietto_generico`;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_WALLET_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_WALLET_PRIVATE_KEY?.replace(/\\n/g, "\n");

export function creaLinkGoogleWallet() {
    const objectId = `${ISSUER_ID}.card_${Date.now()}`;

    const genericObject = {
        id: objectId,
        classId: CLASS_ID,
        state: "ACTIVE",
        barcode: {
            type: "QR_CODE",
            value: "https://www.riccardorodio.com",
            alternateText: "sito web"
        },
        ...walletTemplate
    };

    const claims = {
        iss: SERVICE_ACCOUNT_EMAIL,
        aud: "google",
        typ: "savetowallet",
        iat: Math.floor(Date.now() / 1000),
        payload: {
            genericObjects: [genericObject],
        },
    };

    const token = jwt.sign(claims, PRIVATE_KEY, { algorithm: "RS256" });
    return `https://pay.google.com/gp/v/save/${token}`;
}