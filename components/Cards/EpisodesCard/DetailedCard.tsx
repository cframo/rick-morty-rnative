import React from "react";
import {DetailedCardEpisode} from "../../Types";
import {Avatar, Button, Card, Divider, ListItem, Overlay, Text} from "react-native-elements";


//Style
import {DetailedCardCharacters as STYLE} from '../../Styles';

export default function DetailedCard({episode, visible, setIsVisible}: DetailedCardEpisode): JSX.Element {
    return (
        <Overlay isVisible={visible} onBackdropPress={() => setIsVisible(false)} overlayStyle={STYLE.overlay}>
            <Card containerStyle={STYLE.card}>
                <Card.Title>
                    <Text h4>{episode.name}</Text>
                </Card.Title>
                <Card.FeaturedSubtitle>
                    <Text h4Style={{fontWeight: "100"}}>
                        {episode.episode}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.Divider/>
                <Card.FeaturedSubtitle>
                    <Text h4Style={{fontWeight: "100"}}>
                        {episode.air_date}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.Divider/>
                <Divider style={{backgroundColor: 'gray', marginBottom: "2%"}}/>
                {episode.characters.slice(0, 5).map(character => {
                    return (
                        <ListItem key={character.id+"-"+episode.id}>
                            <Avatar rounded source={{uri: character.image}} size={"medium"}/>
                            <ListItem.Content>
                                <ListItem.Title style={{fontWeight: "bold"}}>
                                    {character.name}
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    );
                })}
                <Divider style={{backgroundColor: 'gray', marginBottom: "6%"}}/>
                <Button title={"Close"} onPress={() => setIsVisible(false)}/>
            </Card>
        </Overlay>
    );
}