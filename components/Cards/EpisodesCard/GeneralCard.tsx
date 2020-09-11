import React, {
} from "react";
import {ListItem} from "react-native-elements";
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

//Styles
import {GeneralCardCharacters as STYLE} from "../../Styles";
import { GeneralEpisodeProps} from "../../Types";

export default function GeneralCard({episode, setEpisode, setVisible}: GeneralEpisodeProps): JSX.Element {

    const showOverlay = (): void => {
        setVisible(true);
        setEpisode(episode);
    }

    return (
        <ListItem Component={TouchableScale} friction={100} tension={100} activeScale={0.95}
                  containerStyle={STYLE.listItem} onPress={showOverlay}>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "bold"}}>
                    {episode.name}
                </ListItem.Title>
                <ListItem.Subtitle>
                    {episode.episode}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="black" size={25}/>
        </ListItem>
    );


}