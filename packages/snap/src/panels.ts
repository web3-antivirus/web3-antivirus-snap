import { heading, panel, Panel, text } from "@metamask/snaps-ui";

export const getErrorPanel = (): Panel =>
  panel([
    heading("😵‍💫 Oops!"),
    text(
      "We can't process your request at the moment. No worries, our team is already working on a fix."
    ),
  ]);

export const getApiErrorPanel = (): Panel =>
  panel([
    heading("😵‍💫 Oops!"),
    text(
      "Our server is not responding. No worries, we are already sorting it out."
    ),
  ]);

export const getRenderErrorPanel = (): Panel =>
  panel([
    heading("😵‍💫 Oops!"),
    text(
      "We can't show the data right now. No worries, our team is already fixing things up.."
    ),
  ]);

export const getStandardPanel = (): Panel =>
  panel([
    heading("All good! 👌"),
    text(
      "W3A found no risks, but don't drop your guard and watch out for any suspicious activity."
    ),
  ]);
