import React, {FunctionComponent} from "react";

import {ScrollView, View} from 'react-native';

import {ListScreen as Style} from "../Styles";

const ListScreen: FunctionComponent<ListScreenProps> = ({style, children}) =>
    <View style={{...Style.screen, ...style}}>
        {children}
    </View>
export default ListScreen;