import {
  h,
  Component,
  createContext,
  createRef,
  render,
  cloneElement,
  toChildArray,
} from "preact";
import {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  useContext,
  useDebugValue,
  useErrorBoundary,
} from "preact/hooks";

import htm from "htm";

const html = htm.bind(h);

import {
  batch,
  computed,
  effect,
  useComputed,
  useSignal,
  signal,
} from "@preact/signals";

export {
  h,
  htm,
  html,
  render,
  Component,
  createContext,
  createRef,
  cloneElement,
  toChildArray,
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  useContext,
  useDebugValue,
  useErrorBoundary,
  batch,
  computed,
  effect,
  useComputed,
  useSignal,
  signal,
};
