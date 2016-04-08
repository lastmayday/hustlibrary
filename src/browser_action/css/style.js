import React, {StyleSheet, Dimensions} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "minWidth": 600
    },
    "head": {
        "marginTop": 16,
        "marginRight": 28,
        "marginBottom": 16,
        "marginLeft": 28
    },
    "nobook": {
        "marginTop": 16,
        "marginRight": 28,
        "marginBottom": 16,
        "marginLeft": 28,
        "color": "#999"
    }
});