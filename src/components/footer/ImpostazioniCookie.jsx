"use client"

export default function ImpostazioniCookie({className = ""}) {
    const apri = () => {
        const fc = window.googlefc;
    if (fc?.showRevocationMessage) {
      fc.showRevocationMessage();
    } else {
      console.warn("Funding Choices non ancora caricato");
    }}
    return(
        <button type="button" onClick={apri} className={`cursor-pointer ${className}`}>
            impostazioni cookie
        </button>
    )
}