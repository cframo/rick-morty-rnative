import React from "react";
import {DetailedCardProps as props} from "../Types";
import {Overlay} from "react-native-elements";
//Style
import {DetailedCardCharacters as STYLE} from '../Styles';

import DetailedCardCharacter from "./DetailedCardCharacter";
import DetailedCardLocation from "./DetailedCardLocation";
import DetailedCardEpisode from "./DetailedCardEpisode";

export default function DetailedCard({type, character, episode, location, visible, setIsVisible}: props): JSX.Element {

    const CHARACTER = 'Character';
    const LOCATION = 'Location';

    const renderDetailedCardByType = (): JSX.Element => {
        switch (type) {
            case CHARACTER:
                return <DetailedCardCharacter character={character!} setIsVisible={setIsVisible}/>
            case LOCATION:
                return <DetailedCardLocation location={location!} setIsVisible={setIsVisible}/>
            default:
                return <DetailedCardEpisode episode={episode!} setIsVisible={setIsVisible}/>
        }
    }

    return (
        <Overlay isVisible={visible} onBackdropPress={() => setIsVisible(false)} overlayStyle={STYLE.overlay}>
            {renderDetailedCardByType()}
        </Overlay>
    );
}