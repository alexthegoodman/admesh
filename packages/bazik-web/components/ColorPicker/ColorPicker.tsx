import * as React from "react";

import styles from "./ColorPicker.module.scss";

import { ColorPickerProps } from "./ColorPicker.d";
import { Flex, Grid, View } from "@adobe/react-spectrum";
import { ColorArea, ColorSlider, ColorWheel } from "@react-spectrum/color";
import { parseColor } from "@react-stately/color";

const ColorPicker: React.FC<ColorPickerProps> = () => {
  let [color, setColor] = React.useState(parseColor("hsl(50, 100%, 50%)"));
  let [, saturationChannel, lightnessChannel] = color.getColorChannels();
  return (
    <fieldset style={{ border: 0 }}>
      <legend>Color Picker</legend>
      <Flex direction="column">
        <View position="relative" width="size-2400">
          <Grid
            position="absolute"
            justifyContent="center"
            alignContent="center"
            width="100%"
            height="100%"
          >
            <ColorArea
              xChannel={saturationChannel}
              yChannel={lightnessChannel}
              value={color}
              onChange={setColor}
              size="size-1200"
            />
          </Grid>
          <ColorWheel value={color} onChange={setColor} size="size-2400" />
        </View>
        <ColorSlider channel="alpha" value={color} onChange={setColor} />
        {/* <p>
          Current value: {color.toString("hsla")} {color.toString("hex")}
        </p> */}
      </Flex>
    </fieldset>
  );
};

export default ColorPicker;
