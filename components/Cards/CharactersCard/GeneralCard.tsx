import React, {
} from "react";
import {Avatar, ListItem} from "react-native-elements";
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

//Styles
import {GeneralCardCharacters as STYLE, CardGeneralStyles as GENERALSTYLE} from "../../Styles";
import {GeneralCardProps} from "../../Types";

export default function GeneralCard({character, setCharacter, setVisible}: GeneralCardProps): JSX.Element {

    const showOverlay = (): void => {
        setVisible(true);
        setCharacter(character);
    }

    return (
        <ListItem Component={TouchableScale} friction={100} tension={100} activeScale={0.95}
                  containerStyle={STYLE.listItem} onPress={showOverlay}>
            <Avatar rounded source={{uri: character.image}} size={"large"}/>
            <ListItem.Content>
                <ListItem.Title style={GENERALSTYLE.font}>
                    {character.name}
                </ListItem.Title>
                <ListItem.Subtitle>
                    {character.species}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="black" size={25}/>
        </ListItem>
    );


}