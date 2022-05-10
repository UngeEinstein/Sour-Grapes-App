import React from 'react';
import { RootStore } from "../Store";
import { GetInput } from "../actions/searchActions";
import { useSelector, useDispatch } from "react-redux"
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    priceBtn: {
        margin: "auto",
        width: 100,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 19,
    },
    description: {
        color: "white",
        fontSize: 16,
    }

});

// This functional component is a button that changes icon depending on if the filter is 'descending' or 'ascending'
// It returns a view with a desribing text and a button that contains a icon. When the button is clicked the 
// function useDispatch() is called on our redux action GetInput() that changes the value of componentState boolean
// lowToHigh on each click. The boolean decides if the sort function sorts ascending or descending.
export default function PriceBtn() {
    const dispatch = useDispatch();
    const componentState = useSelector((state: RootStore) => state.search);

    const arrowIcon = () => {
        let name: string;
        componentState.lowToHigh ? name = "arrow-down" : name = "arrow-up";
        return name;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.description}>
                Sort price:
            </Text>
            <Button buttonStyle={{
                borderRadius: 20,
                backgroundColor: "#6200EE"
            }}
                style={styles.priceBtn} onPress={() => {
                    dispatch(GetInput(componentState.searchString, componentState.price, componentState.country,
                        componentState.page, !componentState.lowToHigh));
                }}
                icon={
                    <Icon
                        name={arrowIcon()}
                        size={28}
                        color="white"
                    />
                }
            />
        </View>
    );
}
