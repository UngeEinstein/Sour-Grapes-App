import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../Store";
import { GetInput } from "../actions/searchActions";
import { StyleSheet, View } from "react-native";
import React from "react";
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    // inspirasjon hentet fra: https://snack.expo.io/@lfkwtz/react-native-picker-select
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // inspirasjon hentet fra: https://snack.expo.io/@lfkwtz/react-native-picker-select
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        color: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon,
    },

});

// This is a functional component that returns a View containing a picker for filtering results
// based on a wines country of production
// When input is entered, the component sends a query to the DB and the results are rendered
export default function CountryPicker() {
    //Enables component to use actions from Redux
    const dispatch = useDispatch();
    //Gets state from Redux
    const PickerState = useSelector((state: RootStore) => state.search);

    return (
        <View style={styles.container}>
            <RNPickerSelect
                placeholder={{
                    label: 'Any country', value: '',
                    placeholderTextColor: "lightgray"
                }}
                style={styles}
                items={[
                    { label: 'United States', value: 'US' },
                    { label: 'Italy', value: 'Italy' },
                    { label: 'France', value: 'France' },
                    { label: 'Portugal', value: 'Portugal' },
                    { label: 'Spain', value: 'Spain' }
                ]}
                onValueChange={(value) => {
                    dispatch(GetInput(PickerState.searchString, PickerState.price, value, PickerState.page, PickerState.lowToHigh))
                }}
            />
        </View>
    )
        ;
}