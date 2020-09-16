import React from "react";
import {Avatar, ListItem} from "react-native-elements";
import {GeneralCardProps as props} from "../Types";
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
//Styles
import {CardGeneralStyles as GENERALSTYLE, GeneralCardCharacters as STYLE} from "../Styles";

export default function GeneralCard({type, character, location, episode, setCharacter, setEpisode, setLocation, setVisible}: props): JSX.Element {

    const showOverlay = (): void => {
        setVisible(true);
        switch (type) {
            case "character":
                setCharacter ? setCharacter(character!) : null;
                break;
            case "location":
                setLocation ? setLocation(location!) : null;
            case "episode":
                setEpisode ? setEpisode(episode!) : null;
        }
    }


    const showImage = (): JSX.Element | null => character ?
        <Avatar rounded source={{uri: character.image}} size={"large"}/> : null;

    const showName = (): string => {
        switch (type) {
            case "character":
                return character!.name;
            case "location":
                return location!.name;
            default:
                return episode!.name;

        }
    }

    const showSubtitle = (): string | null => {

        switch (type) {
            case "location":
                return location!.dimension;
            case "episode":
                return episode!.episode;
            default:
                return character!.species;
        }
    }


    return (
        <ListItem Component={TouchableScale} friction={100} tension={100} activeScale={0.95}
                  containerStyle={STYLE.listItem} onPress={showOverlay}>
            {showImage()}
            <ListItem.Content>
                <ListItem.Title style={GENERALSTYLE.font}>
                    {showName()}
                </ListItem.Title>
                <ListItem.Subtitle>
                    {showSubtitle()}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="black" size={25}/>
        </ListItem>
    );


}