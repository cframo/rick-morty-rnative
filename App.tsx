import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import generateStore from "./Redux/store";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


//React Native Elements
import {ThemeProvider} from "react-native-elements";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";

export default function App() {

    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [welcomePage, setWelcomePage] = useState<boolean>(true);

    const store = generateStore();

    if(!isLoadingComplete)
        return null
    if (welcomePage) {
        return <WelcomeScreen setWelcomePage={setWelcomePage}/>
    }
    return (
        <Provider store={store}>
            <ThemeProvider>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme}/>
                    <StatusBar/>
                </SafeAreaProvider>
            </ThemeProvider>
        </Provider>
    );
}
