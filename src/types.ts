export interface Arguments {
  apiKey: string;
  gameName: string;
  tagLine: string;
  [x: string]: unknown;
}

let _args: Arguments;

export function setArgs(newArgs: Arguments) {
  _args = newArgs;
}

export function getArgs(): Arguments {
  return _args;
}
