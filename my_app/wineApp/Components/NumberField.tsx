import React from 'react';
import { RootStore } from "../Store";
import { GetInput } from "../actions/searchActions";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, TextInput, View } from "react-native";


const styles = StyleSheet.create({
    TextInput: {
        minHeight: 30,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        color: 'white',
        paddingRight: 30,
        minWidth: 100,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

})


// This is a functional component that renders a TextField where the user can input maximum price of the wine
// When input is entered the component rerenders and sends a query to the database
export default function NumberField() {
    //Enables component to use actions from Redux
    const dispatch = useDispatch();
    //Gets state from redux
    const NumberFieldState = useSelector((state: RootStore) => state.search);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.TextInput}
                placeholder="Max Price"
                placeholderTextColor="lightgray"
                underlineColorAndroid='transparent'
                keyboardType={'numeric'}
                onChangeText={text => {
                    if (text != null) {
                        if (text != "") {
                            let newValue = parseInt(text);
                            dispatch(GetInput(NumberFieldState.searchString, newValue, NumberFieldState.country, 0, NumberFieldState.lowToHigh));
                        } else {
                            dispatch(GetInput(NumberFieldState.searchString, -1, NumberFieldState.country, 0, NumberFieldState.lowToHigh));
                        }
                    } else {
                        dispatch(GetInput(NumberFieldState.searchString, -1, NumberFieldState.country, 0, NumberFieldState.lowToHigh));
                    }
                }}
            />
        </View>
    );
}
