import React from "react";
import {DetailedCardLocation} from "../../Types";
import {Avatar, Button, Card, Divider, ListItem, Overlay, Text} from "react-native-elements";


//Style
import {DetailedCardCharacters as STYLE} from '../../Styles';

export default function DetailedCard({location, visible, setIsVisible}: DetailedCardLocation): JSX.Element {
    return (
        <Overlay isVisible={visible} onBackdropPress={() => setIsVisible(false)} overlayStyle={STYLE.overlay}>
            <Card containerStyle={STYLE.card}>
                <Card.Title>
                    <Text h4>{location.name}</Text>
                </Card.Title>
                <Card.FeaturedSubtitle>
                    <Text h4Style={{fontWeight: "100"}}>
                        {location.dimension}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.Divider/>
                <Card.FeaturedSubtitle>
                    <Text h4Style={{fontWeight: "100"}}>
                        {location.type}
                    </Text>
                </Card.FeaturedSubtitle>
                <Card.Divider/>
                <Divider style={{backgroundColor: 'gray', marginBottom: "2%"}}/>
                <Card.FeaturedSubtitle>
                    <Text h4Style={{fontWeight: "100"}}>
                        Residents
                    </Text>
                </Card.FeaturedSubtitle>
                {location.residents.length > 0 && location.residents[0].name != null ?
                    location.residents.slice(0, 5).map(character => {
                            return (
                                <ListItem key={character.id+"-"+location.id}>
                                    <Avatar rounded source={{uri: character.image}} size={"medium"}/>
                                    <ListItem.Content>
                                        <ListItem.Title style={{fontWeight: "bold"}}>
                                            {character.name}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        })
                    :
                    <Text>Whoops, there's no residents in {location.name} :(</Text>
                }

                <Divider style={{backgroundColor: 'gray', marginBottom: "6%"}}/>
                <Button title={"Close"} onPress={() => setIsVisible(false)}/>
            </Card>
        </Overlay>
    );
}