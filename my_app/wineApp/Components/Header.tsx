import React from 'react';
import { StyleSheet, Text } from 'react-native'
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5'

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },
    drink: {
        fontSize: 22,
        color: "#F87060",
    },
})

// https://reactnativeelements.com/docs/header#header-with-default-components
export default function WineHeader() {
    return (
        <Header containerStyle={{
            width: "100%",
            backgroundColor: "#6200EE",
            //marginBottom: 20,
            borderBottomWidth: 0,

        }}
            placement="left"
            leftContainerStyle={{
                alignItems: "flex-start",
            }}
            centerContainerStyle={{
                alignItems: "flex-start",
                paddingLeft: 5,
            }}
            centerComponent={<Icon name="wine-glass-alt" style={styles.drink} />}
            leftComponent={<Text style={styles.title}>Sour Grapes</Text>}
        />
    );
}
