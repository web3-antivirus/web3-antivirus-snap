import { heading, panel, Panel, text } from "@metamask/snaps-ui";

export const getErrorPanel = (): Panel =>
  panel([
    heading("😵‍💫 Oops!"),
    text(
      "Something went wrong, but no worries, we are already sorting it out. Thank you for your patience!"
    ),
  ]);

export const getStandardPanel = (): Panel =>
  panel([
    heading("All good! 👌"),
    text(
      "W3A hasn't detected any risks in this transaction. You can proceed worry-free."
    ),
  ]);
