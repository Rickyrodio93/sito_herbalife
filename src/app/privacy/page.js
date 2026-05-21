import Section from "@/components/Section/Section";
import SectionComponent from "@/components/Section/SectionComponent";
import { SECTIONPOLICY } from "@/components/sections";

export const metadata = {
    title: "privacy policy",
    description: "scopri l'incredibile opportunità di lavoro che offre Herbalife",
    robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

export default function PrivacyPolicy() {
    return(
        <>
        <main>
            {SECTIONPOLICY.map((section, index) => (
                <Section key={index}>
                    <SectionComponent index={index} section={section}/>
                </Section>
            ))}
        </main>
        </>
    )
}