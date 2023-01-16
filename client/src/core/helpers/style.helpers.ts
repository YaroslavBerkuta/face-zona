export const getWithActiveClass = (
  className: string,
  activeClassName: string,
  activeBol: boolean
): string => {
  return `${className} ${activeBol ? activeClassName : ''}`
}


import React from "react";

export const createStyleSheet = <K extends string>(styles: Record<K, React.CSSProperties>) => styles