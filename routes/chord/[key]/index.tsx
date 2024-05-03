import { Handlers, PageProps } from "$fresh/server.ts";
import { Fragment } from "preact";

import { KeyName } from "@/libs/key.ts";
import Keyboard from "@/islands/Keyboard.tsx";
import KeySelector from "@/islands/KeySelector.tsx";
import ChordSelector from "@/islands/ChordSelector.tsx";
import { decodeKey } from "@/libs/helper.ts";

type State = {
  key: KeyName;
};

export const handler: Handlers<State> = {
  async GET(_req, ctx) {
    const key = decodeKey(ctx.params.key) as KeyName;

    const resp = await ctx.render({ key });
    return resp;
  },
};

export default function Key(ctx: PageProps<State>) {
  const key = ctx.data.key;

  return (
    <Fragment>
      <Keyboard offset={0} />
      <KeySelector selectedKey={key} link={true} />
      <ChordSelector selectedKey={key} />
    </Fragment>
  );
}
