import React from "react";
import {DetailedCardCharacter} from "../../Types";
import {Button, Card, Divider, Overlay, Text} from "react-native-elements";
import {View} from "react-native";


//Style
import {DetailedCardCharacters as STYLE} from '../../Styles';

export default function DetailedCard({character, visible, setIsVisible}: DetailedCardCharacter): JSX.Element {
    return (
        <Overlay isVisible={visible} onBackdropPress={() => setIsVisible(false)} overlayStyle={STYLE.overlay}>
            <Card containerStyle={STYLE.card}>
                <Card.Title>
                    <Text h4>{character.name}</Text>
                </Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: character.image}} style={{width: "100%", marginBottom: "6%"}}/>
                <Card.Divider/>
                <View style={STYLE.detail}>
                    <Text style={{fontWeight: "bold"}}>Specie: </Text>
                    <Text>{character.species}</Text>
                </View>
                <Divider style={{backgroundColor: 'gray'}}/>
                <View style={STYLE.detail}>
                    <Text style={{fontWeight: "bold"}}>Type: </Text>
                    {character.type === "" ?
                        <Text style={{fontWeight: "100", color: "gray"}}>Whoops, this {character.species} isn't special
                            :( </Text>
                        : <Text>{character.type}</Text>
                    }
                </View>
                <Divider style={{backgroundColor: 'gray', marginBottom: "2%"}}/>
                <View style={STYLE.detail}>
                    <Text style={{fontWeight: "bold"}}>Gender: </Text>
                    <Text>{character.gender}</Text>
                </View>
                <Divider style={{backgroundColor: 'gray', marginBottom: "6%"}}/>
                <Button title={"Close"} onPress={() => setIsVisible(false)}/>
            </Card>
        </Overlay>
    );
}