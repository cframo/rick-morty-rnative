import React from "react";
import {View, Image} from "react-native";

//UI
import {Button, Card, Divider, Text} from 'react-native-elements'
// welcome's style
import {WelcomeScreen as STYLE} from "../Styles";

//image

import logo from '../../assets/images/logo.png';

export default function WelcomeScreen({setWelcomePage}: WelcomeScreenProps): JSX.Element {

    const date = new Date().toDateString();

    return (
        <View style={STYLE.screen}>
            <View>
                <View>
                    <View style={STYLE.tittleContainer}>
                        <Text h3>
                            React Native Challenge
                        </Text>
                        <Text h4 style={STYLE.nameText}>
                            Franklin Moreno
                        </Text>
                        <Divider style={{backgroundColor: 'black'}}/>
                    </View>
                    <View style={STYLE.imageContainer}>
                        <Image source={logo} resizeMethod={"auto"} resizeMode={"contain"} style={{width: "75%"}}></Image>
                        <Text h3> | </Text>
                        <Text h4 h4Style={{fontWeight: "100"}}>Wiki</Text>
                    </View>
                    <View style={STYLE.buttonContainer}>
                        <Button title={'Enter'} buttonStyle={STYLE.button} onPress={() => setWelcomePage(false)}/>
                    </View>
                    <View style={STYLE.dateContainer}>
                        <Divider style={{backgroundColor: 'black'}}/>
                        <Text h4 h4Style={{fontWeight: "100"}}>
                            {date}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}