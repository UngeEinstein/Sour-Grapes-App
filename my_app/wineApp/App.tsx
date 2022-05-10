import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WineAccordion from './Components/WineAccordion';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import Store from "./Store";
import SearchBar from './Components/SearchBar';
import PriceBtn from './Components/PriceBtn';
import Pagination from './Components/Paginantion'
import NumberField from "./Components/NumberField";
import CountryPicker from "./Components/CountryPicker"
import Header from './Components/Header';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



// Creates a new cache for our AppolloClient.
const client = new ApolloClient({
  cache: new InMemoryCache()
});

// A functional component that is all our content on the webpage. Consisting of a Provider which {Arnstein}. And a
// AppolloProvider which set the client for all the child components which gives them access to the ApolloClient.
// The "real" components are a view containing a Searchbar, pagination, a button that sorts either asc or desc,
// a accordion of wines, which has user rating as a child component.
export default function App() {
  const [showFilters, setShowFilters] = React.useState<Boolean>(false);
  return (
    <Provider store={Store}>
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Header />
          <View style={styles.filters}>
            <SearchBar />
            <Button
              buttonStyle={{
                borderRadius: 20,
                backgroundColor: "#6200EE",
                width: 80,
                marginRight: 20,
                marginBottom: 10,
              }}
              title="Filter"
              onPress={() => { setShowFilters(!showFilters) }}
            />
          </View>
          {showFilters ? <View style={styles.filters}>
            <NumberField />
            <CountryPicker />
            <PriceBtn />
          </View> : <View />}
          <Pagination />
          <WineAccordion />
          <StatusBar style="auto" />
        </View>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223843',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  maxPrice: {
    justifyContent: "center",
  }
});
