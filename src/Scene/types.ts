import GameObject from "./GameObject";

export type FunctionSubscriber = () => void;

export type Subscriber = GameObject | FunctionSubscriber;
