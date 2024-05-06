import { PageProps } from "$fresh/server.ts";

import Footer from "@/components/Footer.tsx";
import Notification from "@/islands/Notification.tsx";
import Nav from "@/islands/Nav.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="layout">
      <Nav />
      <Component />
      <Footer />
      <Notification />
    </div>
  );
}
