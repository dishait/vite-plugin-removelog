import type { Plugin } from "vite";
import { isFunction } from "m-type-tools";
import type { Include } from "./transform";
import { transform as gogocodeTransform } from "./transform";

interface Options {
  /**
   * @default ["log", "warn", "error"]
   */
  include: Include;
  /**
   * @default true
   */
  ignoreNodeModules: boolean;
  /**
   * @default undefined
   */
  normalize: (path: string) => boolean;
}

export default function (
  options?: Partial<Options>,
): Plugin {
  const {
    include = ["log", "warn", "error"],
    normalize,
    ignoreNodeModules = true,
  } = options || {};

  let plugin: Omit<Plugin, "name">;

  if (isFunction(normalize)) {
    plugin = {
      transform(code: string, id: string) {
        if (ignoreNodeModules && /node_modules/.test(id)) {
          return code;
        }

        if (normalize!(id)) {
          return gogocodeTransform(code, include);
        }
      },
    };
  } else {
    plugin = {
      config() {
        return {
          esbuild: {
            pure: include !== "all"
              ? include.map((v) => `console.${v}`)
              : undefined,
            drop: [
              include === "all" ? "console" : "debugger",
            ],
            exclude: ignoreNodeModules ? /node_modules/ : undefined,
          },
        };
      },
    };
  }

  return {
    apply: "build",
    enforce: "post",
    name: "vite-plugin-removelog",
    ...plugin,
  };
}

export { transform as gogocodeRemovelog } from "./transform";
