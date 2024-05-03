import { PageProps } from "$fresh/server.ts";
import { Fragment } from "preact";

import WhiteBoardPage from "@/islands/WhiteBoardPage.tsx";

export default function Whiteboard(_ctx: PageProps) {
  return (
    <Fragment>
      <WhiteBoardPage />
    </Fragment>
  );
}
