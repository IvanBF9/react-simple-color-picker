# react-simple-color-picker

React Simple Color Picker is compatible with TailwindCSS and DaisyUI, and can also be used independently.

![color-picker](https://github.com/IvanBF9/react-simple-color-picker/blob/main/medias/Opened-picker.png?raw=true)

![color-picker-dark-theme](https://github.com/IvanBF9/react-simple-color-picker/blob/main/medias/picker-dark.png?raw=true)

## Install
```
npm i react-simple-color-picker-design
```

## Simple usage

```js
// Base styles of picker
import 'react-simple-color-picker-design/styles/base.css'
// Import of required styles if not using Tailwind and DaisyUI (choose one) /!\
import 'react-simple-color-picker-design/styles/tailwindStylesDark.css' //Dark
import 'react-simple-color-picker-design/styles/tailwindStylesLight.css' //Light

import { useEffect, useState } from "react";
import SimpleColorPicker from "react-simple-color-picker-design";

export default function Demo() {
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    console.log("🚀 value changed ! :", color);
  }, [color]);

  return <SimpleColorPicker defaultColor={color} setColor={setColor} />
```
