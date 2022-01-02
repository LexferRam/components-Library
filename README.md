# Crear Libreria UI

## Herramientas para el desarrollo de la libreria

1. TypeScript
2. Rollup
3. Storybook
4. Jest and React Testing Library

## Pasos para crear el proyecto

1. npm init --yes
2. npm i -D react typescript @types/react
3. types del componente:

```typescript
import {  MouseEventHandler } from "react"
export interface ButtonProps {
    text?: string,
    primary?:boolean,
    disabled?: boolean,
    size?: "small" | "medium" | "large",
    onClick?: MouseEventHandler<HTMLButtonElement>
}
```

4. Crear el componente usando styled-components: npm install -D styled-components @types/styled-components.

```typescript
import React,{FC} from 'react'
import styled from 'styled-components';

import {ButtonProps} from "./Button.types"

const StyledButton = styled.button<ButtonProps>`
    border: 0;
    line-height: 1;
    font-size: 15px;
    cursor: pointer;
    font-weight: 700;
    font-weight: bold;
    border-radius: 3px;
    display: inline-block;
    padding: ${props => props.size === "small"? "7px 25px 8px" : (props.size === "medium"? "9px 30px 11px" : "14px 30px 16px" )};
    color: ${props => props.primary? "#1b116e":"#ffffff"};
    background-color: ${props => props.primary ? "#6bedb5":"#1b116e"};
    opacity: ${props => props.disabled ? 0.5 : 1};
    &:hover {
      background-color: ${props => props.primary ? "#55bd90":"#6bedb5"};
    }
    &:active {
        border: solid 2px #1b116e;
        padding: ${props => props.size === "small"? "5px 23px 6px" : (props.size === "medium"? "7px 28px 9px" : "12px 28px 14px" )};
    }
`;

const Button: FC<ButtonProps> = ({size, primary, disabled, text, onClick, ...props}) => {
    return (
        <StyledButton type="button" onClick={onClick} primary={primary} disabled={disabled} size={size} {...props}>
            {text}
        </StyledButton>
    )
}

export default Button;
```

5. Configurar TS y Rollup

* Generar el archivo tsconfig.json ejecutando:

```npm
npx tsc --init
```

* tsconfig.json:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true, // skips type checking of declaration files
    "jsx": "react",
    "module": "ESNext",  //ndicates that we will be compiling the code into the latest version of JavaScript (ES6 and above, so you can use import statements).
    "declaration": true,
    "declarationDir": "types",
    "sourceMap": true, //tells the compiler that we want source map generation. A source map is a file that maps the transformed source to the original source, which enables the browser to present the reconstructed original in the debugger.
    "outDir": "dist",
    "moduleResolution": "node",
    "emitDeclarationOnly": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
  },
  "exclude": [
    "dist",
    "node_modules",
    "src/**/*.test.tsx",
    "src/**/*.stories.tsx",
  ],
}
```

* configurar Rollup

```npm
npm i -D rollup
```

**Se necesitan las siguientes caracteristicas**:
* Bundling to CommonJS format
* Resolving third-party dependencies in node_modules
* Transpiling our TypeScript code to JavaScript
* Preventing bundling of peerDependencies
* Minifying the final bundle
* Generating type files (.d.ts), which provide TypeScript type information about the components in our project
  
  **Estas caracteristicas se pueden alcanzar con los siguientes modulos:**

  ```npm
  npm i -D @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-peer-deps-external rollup-plugin-terser rollup-plugin-dts
  ```

* Crear: rollup.config.js y colocar:

```javascript
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
        ],
        external: ["react", "react-dom", "styled-components"]
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
    },
];
```

* Agregar en el package.json

```json
"main": "dist/cjs/index.js",
"module": "dist/esm/index.js",
```

* Agregar el script en el package.json:

```json
"build": "rollup -c"
```

* compilar el proyecto ejecutando:
  
```npm
npm run build
```

6. Integrar storybook

```npm
npx sb init
```

* Agrega los siguientes scripts(it will generate the directories .storybook and stories in your project):

```json
 "scripts": {
   "storybook": "start-storybook -p 6006",
   "build-storybook": "build-storybook"
  }
```
* Cambiar la configuracion por defaecto de storybook(main.js):

```javascript
 module.exports = {
  "stories": [
    "../src/**/**/*.stories.mdx",
    "../src/**/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
```

* Escribir la primera historia para el componente Button.stories.js:

```javascript
import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button  from './Button';
import {ButtonProps} from "./Button.types"

export default {
  title: 'Marbella/Button',
  component: Button,
  argTypes: {
  },
} as Meta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  disabled: false,
  text: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  disabled: false,
  text: "Secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  primary: false,
  disabled: true,
  text: 'Disabled',
};
```

* Ejecutar storybook en localhost: 
  
  ```npm 
  npm run storybooks
  ```
7. Anadir Testing with Jest y React Testing Library

```npm
npm install @testing-library/react @testing-library/jest-dom @testing-library/user-event  jest @types/jest -D
```
<!-- Button.test.tsx -->
```javascript
import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'

import Button from "./Button";

describe("Running Test for Marbella Button", () => {

  test("Check Button Disabled", () => {
    render(<Button text="Button marbella" disabled/>)
    expect(screen.getByRole('button',{name:"Button marbella"})).toBeDisabled();
  });

});
```

* Ejecutar tests

```npm
npm run test
```

8. Publicar en npm
   
* Loguearse en npm: **npm login**
* Publicar: **npm publish --access public**
* **NOTA:** si no se tiene usuario creado en npm, se creara automaticamente, y se debe verificar el usuario por correo para que se permita la publicacion del package en npm, y cada vez que se publique una nueva version se debe cambiar en el package.json


## Usar StoryBook en GitHubPages para probar los componentes

1. Instalar como dependencia de desarrollo:

```npm
npm install @storybook/storybook-deployer -D
```

2. Agregar en el package.json:

```json
"scripts": {
  //...
  "deploy-storybook": "storybook-to-ghpages"
}
```

3. Publicar en GitHubPages ejecutando:

```npm
npm run deploy-storybook
```

4. Visitar url en: <https://lexferram.github.io/components-Library/?path=/story/example-introduction--page>
