import { Events } from "jet-tools";

export type AppEvents = {
  event: {
    data: string;
  };
  forceLogout: {
    data?: any;
  };
  showMessageAlert: {
    title: "";
    onClick: () => void;
    onClose: () => void;
    variantModal: "info" | "choice";
    textInfo?: string;
    textChoice?: string;
    btnTitles: {
      confirm?: string;
      close?: string;
    };
  };
};

export const appEvents = new Events<AppEvents>();
