import { Outlet } from "react-router-dom";
import ScrollToTop from "./scrollToTop";
import PageTracking from "./utils/PageTracking";


export default function Layout() {
  return (
    <>
      <PageTracking />
      <ScrollToTop />
      <Outlet />
    </>
  );
}
