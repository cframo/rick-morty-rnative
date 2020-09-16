import React from "react";
import {DetailedCardProps as props } from "../Types";
import {Avatar, Button, Card, Divider, ListItem, Overlay, Text} from "react-native-elements";
//Style
import {CardGeneralStyles as GENERALSTYLE, DetailedCardCharacters as STYLE} from '../Styles';

export default function DetailedCard({episode, location, visible, setIsVisible}: props): JSX.Element {

    return (
        <Overlay isVisible={visible} onBackdropPress={() => setIsVisible(false)} overlayStyle={STYLE.overlay}>
            <Card containerStyle={STYLE.card}>
                <Card.Title>
                    <Text h4>{episode ? episode.name : location!.name}</Text>
                </Card.Title>
                <Card.FeaturedSubtitle>
                    <Text h4Style={GENERALSTYLE.font100}>
                        {episode ? episode.episode : location!.dimension}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.Divider/>
                <Card.FeaturedSubtitle>
                    <Text h4Style={GENERALSTYLE.font100}>
                        {episode ? episode.air_date : location!.type}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.Divider/>
                <Divider style={GENERALSTYLE.dividerMargin2}/>
                {episode ? episode.characters.slice(0, 5).map(character =>
                        <ListItem key={character.id + "-" + episode.id}>
                            <Avatar rounded source={{uri: character.image}} size={"medium"}/>
                            <ListItem.Content>
                                <ListItem.Title style={GENERALSTYLE.font}>
                                    {character.name}
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ) :
                    location!.residents.length > 0 && location!.residents[0].name != null ?
                        location!.residents.slice(0, 5).map(character =>
                            <ListItem key={character.id + "-" + location!.id}>
                                <Avatar rounded source={{uri: character.image}} size={"medium"}/>
                                <ListItem.Content>
                                    <ListItem.Title style={GENERALSTYLE.font}>
                                        {character.name}
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        )
                        :
                        <Text>Whoops, there's no residents in {location!.name} :(</Text>
                }
                <Divider style={GENERALSTYLE.dividerMargin6}/>
                <Button title={"Close"} onPress={() => setIsVisible(false)}/>
            </Card>
        </Overlay>
    );
}