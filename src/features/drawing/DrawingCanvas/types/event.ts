import type { MouseEvent } from "react";

export interface ToolMouseEvent extends paper.ToolEvent {
  event: MouseEvent;
  tool: paper.Tool;
}
