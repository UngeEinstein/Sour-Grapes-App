import React, { useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { client } from "./Client";
import { gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from "../Store";
import { GetInput } from "../actions/searchActions";

const getFilterDocumentCountNumber = gql`
query Query($input: String!, $country: String!, $price: Int!, $increasing: Boolean!) {
  filterDocumentCount(title: $input, country: $country, price: $price, increasing: $increasing)
}`

//Gets the number of wines that satisfies the the filtering values. 
//The component use this function to find out if there is a next page.
async function getFilterDocumentCount(input: String, country: String, price: Number, increasing: Boolean) {
  const responses = await client.query({
    query: getFilterDocumentCountNumber,
    variables: {
      input: input,
      country: country,
      price: price,
      increasing: increasing
    }
  }).then(result => result.data.filterDocumentCount);
  return responses;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  pageNr: {
    color: "white",
    fontSize: 28,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {

  }
});


const Pagination = () => {

  const dispatch = useDispatch();
  const componentState = useSelector((state: RootStore) => state.search);

  //The state is the number of wines that satisfie the filters.
  //Uses the state to get the number of pages.
  const [state, setState] = useState<number>(128871);


  //Every time the user changes one of the filters, the amount of pages change.
  //This function updates the number of wines.
  React.useEffect(() => {

    const getCount = async () => {
      const count = await getFilterDocumentCount(componentState.searchString, componentState.country, componentState.price, false);
      if (state !== count) {
        setState(count);
      }
    };
    getCount();
  }, [componentState.searchString, componentState.price, componentState.country]);


  return (
    <View style={styles.container}>
      {//If you are on the first page, the prev button should not show.
        componentState.page !== 0 ?
          <Button
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "#6200EE",
              width: 100,
            }}
            onPress={() => {
              dispatch(GetInput(componentState.searchString, componentState.price, componentState.country, componentState.page - 1, componentState.lowToHigh));
            }}
            icon={<Icon
              name="arrow-left"
              size={25}
              color="white" />}
            title="  Prev" /> : <View></View>}
      <Text style={styles.pageNr}>{componentState.page + 1}</Text>
      {//If you are on the last page, the next button should not show.
        componentState.page < state / 50 - 1 ?
          <Button
            style={styles.button}
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "#6200EE",
              width: 100,
            }}
            onPress={() => {
              dispatch(GetInput(componentState.searchString, componentState.price, componentState.country, componentState.page + 1, componentState.lowToHigh));
            }}
            icon={<Icon
              name="arrow-right"
              size={25}
              color="white" />}
            iconRight
            title="Next  " /> : <View></View>}
    </View>
  );
};

export default Pagination;