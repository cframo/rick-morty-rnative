import {StyleSheet} from "react-native";

export const WelcomeScreen = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        marginVertical: "15%",
    },
    tittleContainer: {
        flex: 1
    },
    nameText: {
        marginBottom: 10
    },
    imageContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: 'gray'
    },
    button: {
        width: 140,
        height: 60,
        justifyContent: 'center'
    },
    dateContainer: {
        marginVertical: 20,
        alignItems: "center"
    }


});