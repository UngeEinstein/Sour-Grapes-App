import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../Store";
import { GetInput } from "../actions/searchActions";
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
        minWidth: 250,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    }

})

// This third-party component is from 
// https://reactnativeelements.com/docs/searchbar/#platform-specific-searchbar and is a searchfield. 
//It uses the function useDispatch() that renders the component each time a user writes in the searchfield. 
// It also checks that the string is not empty or the text is the same as the "old state" to avoid an eternal loop.
export default function WineSearch() {
    const dispatch = useDispatch();
    const searchState = useSelector((state: RootStore) => state.search);

    let timeout: number = 0;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.TextInput}
                placeholder="Search"
                placeholderTextColor="lightgray"
                underlineColorAndroid='transparent'
                onChangeText={(search) => {
                    clearTimeout(timeout);

                    // Make a new timeout set to go off in 1000ms (1 second)
                    // Did this so to avoid uneccessary calls to the database.
                    timeout = setTimeout(function () {
                        if (search !== null && search !== searchState.searchString) {
                            dispatch(GetInput(search, searchState.price, searchState.country, 0, searchState.lowToHigh))
                        }
                    }, 1000);

                }}
            />
        </View>
    );
}




