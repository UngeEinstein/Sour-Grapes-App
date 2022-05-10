import React from "react";
import { ActivityIndicator, Text, StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootStore } from "../Store";
// @ts-ignore
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import StarRating from './StarRating';
import { client } from './Client';

// This is our GraphQL query that filters the result and returns a list of all the wines with each 
// title, points, price, description, taster_name and country from every wine.
const getFilteredList = gql`
    query Query($input: String!, $country: String!, $price: Int!, $page: Int!, $increasing: Boolean!, $sortByPrice: Boolean!, $lowToHigh: Boolean!) {filter(title: $input, country: $country, price: $price, page: $page, increasing: $increasing, sortByPrice: $sortByPrice, lowToHigh: $lowToHigh) {
      title
      points
      price
      description
      taster_name
      country
    }}
  `
// This function takes in the search input, and other filters if they are given such ass country, price, page or if
// its sorted high to low or opposite. Then it sends the info to the GraphQL query above with these arguments.
// The response variabel awaits for the database to return the promise, then it returns the response with the array
// of wines.
export async function getFiltered(input: String, country: String, price: Number, page: Number, increasing: Boolean, sortByPrice: Boolean, lowToHigh: Boolean) {
    const responses = await client.query({
        query: getFilteredList,
        variables: {
            input: input,
            country: country,
            price: price,
            page: page,
            increasing: increasing,
            sortByPrice: sortByPrice,
            lowToHigh: lowToHigh

        }
    }).then(result => result.data.filter);
    return responses;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    collapse: {
        minHeight: 50,
        borderColor: 'gray',
        borderRadius: 20,
        marginBottom: 5,
        padding: 5,
        backgroundColor: "white",

    },
    headerText: {
        fontSize: 22,
        color: "#223843",
        fontWeight: "bold",
        justifyContent: "flex-start",
        maxWidth: "85%"
    },
    wineHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: 10,
        marginRight: 15,
    },
    wineBody: {
        marginTop: 5,
        marginBottom: 5,
        overflow: "hidden",
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        marginLeft: 35

    },
    wineBodyText: {
        color: "black",
        fontSize: 16,
    },
    reviewText: {
        color: "red",
        fontSize: 16,
    },
    counter: {
        color: "#223843",
        fontWeight: "bold",
        marginLeft: 5,
        marginRight: 10,
        fontSize: 22,
    },
    noWines: {
        color: "white",
        fontSize: 22,
    }
});

// A functional component that returns a scrollable accordion, which is a list which contains more information that
// becomes visible after an element is clicked. Each list element has a header which contains the name and wine 
// index. The element also has a body of information that consists of a description, price, points, country and
// the name of the wine taster. Also the body has a star rating, which is further explained in 
// "./Components/StarRating.tsx"
const WineAccordion = () => {
    const [wines, setWines] = React.useState<String[]>([]);
    const [loading, setLoading] = React.useState<Boolean>(false);
    const componentState = useSelector((state: RootStore) => state.search);
    let wineArray: any[] = []

    // This functional compoenent is called once when the component is rendered. It awaits the response of 
    //getFiltered() which returns a list of json wine objects. It puts every wine in a array and pushes this 
    //array to our useState wines by the function setWines(). At the end of useEffect the default state is set
    // by the componentState.
    React.useEffect(() => {
        const wineList = async () => {
            const response = await getFiltered(componentState.searchString, componentState.country, componentState.price, componentState.page, false, true, componentState.lowToHigh);
            for (let wine in response) {
                wineArray.push([response[wine].title, response[wine].price, response[wine].points,
                response[wine].description, response[wine].taster_name, response[wine].country])
            }
            setWines(wineArray);
            setLoading(false);
        };
        setLoading(true);
        wineList();
    }, [componentState.searchString, componentState.country, componentState.price, componentState.page, componentState.lowToHigh]);



    let counter: number = 1 + componentState.page * 50;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {loading ? <ActivityIndicator size="large" color="#6200EE" /> : wines.length === 0 ?
                    <Text style={styles.noWines}>No wines...</Text> : wines.map((wine) => {
                        return (
                            <Collapse style={styles.collapse} isCollapsed={false} key={wine[0] + counter}>
                                <CollapseHeader style={styles.wineHeader}>
                                    <Text style={styles.counter}>
                                        {counter++}.
                                    </Text>
                                    <Text style={styles.headerText}>
                                        {wine[0]}
                                    </Text>
                                </CollapseHeader>
                                <CollapseBody style={styles.wineBody}>
                                    <Text style={styles.wineBodyText}>
                                        {wine[3]}
                                        {"\n"}
                                        {"\n"}
                                    Price: {wine[1]}
                                        {"\n"}
                                    Points: {wine[2]}
                                        {"\n"}
                                    Country: {wine[5]}
                                        {"\n"}
                                    Taster: {wine[4]}
                                        {"\n"}
                                    </Text>
                                    <Text style={styles.reviewText}>
                                        {"\n"}
                                    Give your review!
                                    </Text>
                                    <StarRating title={wine[0]} />
                                </CollapseBody>
                            </Collapse>
                        );
                    })}
            </ScrollView>
        </SafeAreaView >
    );
};

export default WineAccordion;
