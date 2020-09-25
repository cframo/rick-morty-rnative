import React from "react";
import {DetailedCardLocationProps} from "../Types";
import {CardGeneralStyles as GENERALSTYLE, DetailedCardCharacters as STYLE} from "../Styles";
import {Avatar, Button, Card, Divider, ListItem, Text} from "react-native-elements";

const DetailedCardLocation = ({location, setIsVisible}: DetailedCardLocationProps): JSX.Element =>
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
        {location!.residents.length > 0 && location!.residents[0].name != null ?
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
    </Card>;
export default DetailedCardLocation;