import {StyleSheet} from "react-native";

export const ListScreen = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },

});

export const GeneralCardCharacters = StyleSheet.create({
    listItem: {
        marginVertical: "2%",
        borderWidth: 1,
        borderColor: '#f3f2f2',
        borderRadius: 10,
    }
});

export const DetailedCardCharacters = StyleSheet.create({
    overlay: {
        width: "90%",
        padding: 0
    },
    card: {
        borderWidth: 0,
        elevation: 0
    },
    detail: {
        flexDirection: "row",
        marginBottom: "4%"
    }
})

export const CharacterScreen = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%'
    },
    body: {
        flex: 1,
        justifyContent: "flex-start"
    },
    header: {
        marginBottom: 10,
        elevation: 1,
        alignItems: "center"
    },
    content: {
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3"
    }

});

export const Filters = StyleSheet.create({
    listItem: {
        width: "95%",
        marginTop: "2%",
        borderRadius: 10,
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10
    },
    button: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#63aee8",
        width: 85
    },
    buttonCancel: {
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: "red",
        borderColor: 'red',
        width: 85,
    }
})
