import React from "react";
import {Avatar, Button, Card, Divider, ListItem, Text} from "react-native-elements";
import {CardGeneralStyles as GENERALSTYLE, DetailedCardCharacters as STYLE} from "../Styles";
import {DetailedCardEpisodeProps} from "../Types";

const DetailedCardEpisode = ({episode, setIsVisible}: DetailedCardEpisodeProps): JSX.Element =>
    <Card containerStyle={STYLE.card}>
        <Card.Title>
            <Text h4>{episode.name}</Text>
        </Card.Title>
        <Card.FeaturedSubtitle>
            <Text h4Style={GENERALSTYLE.font100}>
                {episode.episode}
            </Text>
        </Card.FeaturedSubtitle>
        <Card.Divider/>
        <Card.FeaturedSubtitle>
            <Text h4Style={GENERALSTYLE.font100}>
                {episode.air_date}
            </Text>
        </Card.FeaturedSubtitle>
        <Card.Divider/>
        <Divider style={GENERALSTYLE.dividerMargin2}/>
        {episode.characters.slice(0, 5).map(character =>
                <ListItem key={character.id + "-" + episode.id}>
                    <Avatar rounded source={{uri: character.image}} size={"medium"}/>
                    <ListItem.Content>
                        <ListItem.Title style={GENERALSTYLE.font}>
                            {character.name}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            )}
        <Divider style={GENERALSTYLE.dividerMargin6}/>
        <Button title={"Close"} onPress={() => setIsVisible(false)}/>
    </Card>;
export default DetailedCardEpisode;