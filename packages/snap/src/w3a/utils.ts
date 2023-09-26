import {
  Component,
  copyable,
  divider,
  heading,
  spinner,
  text,
} from "@metamask/snaps-ui";
import { NODE_TYPE, SnapResponseDTOItem } from "./interfaces";

const LAYOUT_COMPONENT_BY_TYPE = {
  [NODE_TYPE.COPYABLE]: copyable,
  [NODE_TYPE.DIVIDER]: divider,
  [NODE_TYPE.HEADING]: heading,
  [NODE_TYPE.SPINNER]: spinner,
  [NODE_TYPE.TEXT]: text,
};

export const renderLayoutFromSnapResponse = (
  items: SnapResponseDTOItem[]
): Component[] =>
  items.reduce<Component[]>((acc, { node, data }) => {
    const component = LAYOUT_COMPONENT_BY_TYPE[node];
    if (component) {
      return [...acc, data ? component(data) : component()];
    }
    return acc;
  }, []);
