# Quercus

Quercus is a client-side map frontend which aims to be easily configurable (add layers, tweak them, deal whith GeoJSON or GPXs...), whithout losing the configuration between visits (all of this locally stored, of course).

This project is built with [Vue, 3<sup>rd</sup> of the name](https://vuejs.org), subtely painted with [TailwindCSS](https://tailwindcss.com/) and [Headless UI](https://headlessui.com/), and powered by [Leaflet](https://leafletjs.com) (through [Vue Leaflet](https://github.com/vue-leaflet/vue-leaflet))

## Do it yourself

### Setup

```sh
npm install
```

### Develop

```sh
npm run dev
```

### Test

```sh
npm run test:unit
```

### Build

```sh
npm run build
```

## Tooling

[VSCodium](https://vscodium.com/) + [Volar](https://open-vsx.org/extension/Vue/volar) (not Vetur) is the recommended setup _(mine, at least)_.

For support of `.vue` imports in TS, chose your path and follow the steps below:

#### 1. TypeScript Vue Plugin
> _Pro_: One-time setup\
> _Con_: Two TS language services are running in parallel (Codium's default and plugin one), which can impact Codium perfs

Install the [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin), and you're ready to go.

#### 2. Volar "Takeover Mode" _(my personal fav)_
> _Pro_: Only one TS language service running\
> _Con_: A quick setup is needed for each project

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

_Source: https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode_
