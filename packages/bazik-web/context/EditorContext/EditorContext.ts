import React, { useState, useReducer, Dispatch } from "react";

export enum Geometry {
  text = "TEXT",
  box = "BOX",
  cone = "CONE",
}

export interface Entity {
  geometry: Geometry;
}

export interface EditorContextState {
  entities: Entity[] | null;
}

export const EditorContextState = {
  entities: [],
};

export const EditorContextReducer = (
  state: EditorContextState,
  action: any
) => {
  switch (action.key) {
    // case value:
    //   break;

    default:
      return {
        ...state,
        [action.key]: action.value,
      };
      break;
  }
};

export const EditorContext = React.createContext<
  [EditorContextState, Dispatch<any>]
>([EditorContextState, () => undefined]);

export const useEditorContext = () =>
  React.useContext(EditorContext) as unknown as any;
