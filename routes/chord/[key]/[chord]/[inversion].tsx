import { PageProps } from "$fresh/server.ts";

import { KeyName } from "@/libs/key.ts";
import ChordPage from "@/islands/ChordPage.tsx";
import { Fragment } from "preact";
import { decodeKey } from "@/libs/helper.ts";
import { decodeChord } from "@/libs/helper.ts";

type Props = {
  key: string;
  chord: string;
  inversion: string;
};

export default function Inversion(props: PageProps<Props>) {
  const key = decodeKey(props.params.key) as KeyName;
  const chord = decodeChord(props.params.chord);
  const inversion = decodeChord(props.params.inversion);

  return (
    <Fragment>
      <ChordPage
        selectedKey={key}
        selectedChord={chord}
        inversion={inversion}
      />
    </Fragment>
  );
}
