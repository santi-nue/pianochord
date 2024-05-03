import { forceDescriptives, randomList } from "@/libs/helper.ts";
import { simpleKeys } from "@/libs/key.ts";

const total = simpleKeys.length * 2;

const top = forceDescriptives(randomList(total, 1, 50), 50, 20);
const left = forceDescriptives(randomList(total, 1, 99), 50, 30);
const size = randomList(total, 2, 7);

export default function Decoration() {
  return (
    <div className="decor-container">
      {[...simpleKeys, ...simpleKeys].map((key, i) => {
        return (
          <span
            className={[
              "color-" + (i % simpleKeys.length + 1),
              i % 2 == 0 ? "mobile-hide" : "",
            ].join(" ")}
            style={{
              top: top[i] + "%",
              left: left[i] + "%",
              fontSize: size[i] + "rem",
            }}
          >
            {key}
          </span>
        );
      })}
    </div>
  );
}
