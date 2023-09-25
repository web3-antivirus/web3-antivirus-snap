export enum NODE_TYPE {
  COPYABLE = "copyable",
  DIVIDER = "divider",
  HEADING = "heading",
  SPINNER = "spinner",
  TEXT = "text",
}

export interface SnapResponseDTOItem {
  node: NODE_TYPE;
  data: string;
}

export interface SnapResponseDTO {
  items: SnapResponseDTOItem[];
}
