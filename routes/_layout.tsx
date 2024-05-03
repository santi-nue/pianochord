import { PageProps } from "$fresh/server.ts";

import Footer from "@/components/Footer.tsx";
import Notification from "@/islands/Notification.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="layout">
      <Component />
      <Footer />
      <Notification />
    </div>
  );
}
