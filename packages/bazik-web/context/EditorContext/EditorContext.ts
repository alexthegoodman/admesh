import React, { useState, useReducer, Dispatch } from "react";

export enum Geometry {
  text = "TEXT",
  box = "BOX",
  cone = "CONE",
}

export interface Entity {
  id: string;
  geometry: Geometry;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  content?: string;
  size?: number;
  thickness?: number;
  color?: string;
}

export interface EditorContextState {
  selectedEntity: string | null;
  entities: Entity[] | null;
  transformMode: "translate" | "rotate" | "scale";
}

export const EditorContextState = {
  selectedEntity: null,
  entities: [],
  transformMode: "translate",
};

export const EditorContextReducer = (
  state: EditorContextState,
  action: any
) => {
  // console.info("EditorContextReducer", action);
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
