import { PageProps } from "$fresh/server.ts";

import { KeyName } from "@/libs/key.ts";
import ChordPage from "@/islands/ChordPage.tsx";
import { Fragment } from "preact";
import { decodeKey } from "@/libs/helper.ts";
import { decodeChord } from "@/libs/helper.ts";

export default function Chord(props: PageProps<{ key: string }>) {
  const key = decodeKey(props.params.key) as KeyName;
  const chord = decodeChord(props.params.chord);

  return (
    <Fragment>
      <ChordPage selectedKey={key} selectedChord={chord} />
    </Fragment>
  );
}
