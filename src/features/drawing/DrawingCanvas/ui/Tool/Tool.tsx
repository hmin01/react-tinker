import type { ToolProps } from "./Tool.props";
import { useTool } from "./useTool";

export function Tool(props: ToolProps) {
  useTool(props);

  return null;
}
