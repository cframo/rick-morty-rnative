import React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";

export default function Error(props: any) {
    return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <Text>Whoops, something go wrong :(</Text>
            <Button title={"Try again"} type={"outline"}/>
        </View>
    )
}