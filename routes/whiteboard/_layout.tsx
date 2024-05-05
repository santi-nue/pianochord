import { PageProps } from "$fresh/server.ts";

import Nav from "@/islands/Nav.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="layout">
      <Nav />
      <Component />
    </div>
  );
}
