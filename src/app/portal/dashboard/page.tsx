import { redirect } from "next/navigation";

/** Legacy route — dashboards live at `/portal` with demo query params. */
export default function PortalDashboardRedirect() {
  redirect("/portal?demo=student");
}
