import AssistantChat from "@/components/assistantChat/AssistantChat";
import DisclaimerPopup from "@/components/DisclaimerPopup";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function SitoLayout({children}) {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    <DisclaimerPopup/>
    <AssistantChat/>
    </>
  )
}