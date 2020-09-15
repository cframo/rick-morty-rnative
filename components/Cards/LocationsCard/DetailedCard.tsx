import React from "react";
import {DetailedCardLocation} from "../../Types";
import {Avatar, Button, Card, Divider, ListItem, Overlay, Text} from "react-native-elements";
//Style
import {CardGeneralStyles as GENERALSTYLE, DetailedCardCharacters as STYLE} from '../../Styles';

export default function DetailedCard({location, visible, setIsVisible}: DetailedCardLocation): JSX.Element {
    return (
        <Overlay isVisible={visible} onBackdropPress={() => setIsVisible(false)} overlayStyle={STYLE.overlay}>
            <Card containerStyle={STYLE.card}>
                <Card.Title>
                    <Text h4>{location.name}</Text>
                </Card.Title>
                <Card.FeaturedSubtitle>
                    <Text h4Style={GENERALSTYLE.font100}>
                        {location.dimension}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.Divider/>
                <Card.FeaturedSubtitle>
                    <Text h4Style={GENERALSTYLE.font100}>
                        {location.type}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.Divider/>
                <Divider style={GENERALSTYLE.dividerMargin2}/>
                <Card.FeaturedSubtitle>
                    <Text h4Style={GENERALSTYLE.font100}>
                        Residents
                    </Text>
                </Card.FeaturedSubtitle>
                {location.residents.length > 0 && location.residents[0].name != null ?
                    location.residents.slice(0, 5).map(character =>
                        <ListItem key={character.id + "-" + location.id}>
                            <Avatar rounded source={{uri: character.image}} size={"medium"}/>
                            <ListItem.Content>
                                <ListItem.Title style={GENERALSTYLE.font}>
                                    {character.name}
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    )
                    :
                    <Text>Whoops, there's no residents in {location.name} :(</Text>
                }

                <Divider style={GENERALSTYLE.dividerMargin6}/>
                <Button title={"Close"} onPress={() => setIsVisible(false)}/>
            </Card>
        </Overlay>
    );
}