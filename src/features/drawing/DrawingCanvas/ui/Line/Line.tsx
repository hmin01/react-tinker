import type { LineProps } from "./Line.props";
import { useLine } from "./useLine";

export function Line(props: LineProps) {
  useLine(props);

  return <></>;
}
