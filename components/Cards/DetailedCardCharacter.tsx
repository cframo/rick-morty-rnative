import React from "react";
import {DetailedCardCharacterProps as props} from "../Types";
import {Button, Card, Divider, Text} from "react-native-elements";
import {View} from "react-native";
//Style
import {CardGeneralStyles as GENERALSTYLE, DetailedCardCharacters as STYLE} from '../Styles';

const DetailedCardCharacter = ({character, setIsVisible}: props): JSX.Element =>
    <Card containerStyle={STYLE.card}>
        <Card.Title>
            <Text h4>{character.name}</Text>
        </Card.Title>
        <Card.Divider/>
        <Card.Image source={{uri: character.image}} style={GENERALSTYLE.image}/>
        <Card.Divider/>
        <View style={STYLE.detail}>
            <Text style={GENERALSTYLE.font}>Specie: </Text>
            <Text>{character.species}</Text>
        </View>
        <Divider style={GENERALSTYLE.background}/>
        <View style={STYLE.detail}>
            <Text style={GENERALSTYLE.font}>Type: </Text>
            {character.type === "" ?
                <Text style={GENERALSTYLE.textMuted}>Whoops, this {character.species} isn't special
                    :( </Text>
                : <Text>{character.type}</Text>
            }
        </View>
        <Divider style={GENERALSTYLE.dividerMargin2}/>
        <View style={STYLE.detail}>
            <Text style={{fontWeight: "bold"}}>Gender: </Text>
            <Text>{character.gender}</Text>
        </View>
        <Divider style={GENERALSTYLE.dividerMargin6}/>
        <Button title={"Close"} onPress={() => setIsVisible(false)}/>
    </Card>;
export default DetailedCardCharacter;
