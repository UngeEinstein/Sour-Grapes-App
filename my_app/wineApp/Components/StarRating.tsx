import { gql } from '@apollo/client';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { client } from './Client';

// This is the call to our GraphQL mutation that writes to the Database. It takes in the inputs title and points and
// calls the mutation giveReview().
const submitReviewGQL = gql`
mutation Mutation($title:String, $points: String) {
    giveReview(title: $title, points: $points)
  }
`;

// This function takes in the arguments title and starRating which through the apollo client calls the mutation
// above and returns the result which is a string with feedback of the given review, and the average user rating
// and the total amount of ratings.
async function submitRating(title: string, starRating: number) {
    let points = starRating.toString();
    let response = client
        .mutate({
            mutation: submitReviewGQL,
            variables: { title: title, points: points }
        }).then(result => result.data.giveReview);

    let wineRating = await response;
    return wineRating;
}

// The readOnly prop is for the future if we were to implement the average rating as also a star rating which can't
// be interacted with.
interface Props {
    title?: string;
    readOnly?: boolean;
}

const styles = StyleSheet.create({
    starRating: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        color: "red",
    }
})

// This component returns a view with a star rating and after a rating is given a text with feedback appears.
// The reason the feedback (average rating etc..) is to not sway the voters judgement before they vote.
function WineRating(props: Props) {
    const [value, setValue] = React.useState<number>(0);
    let wineRating = "";
    let avgRating = "";
    let ratingCount = "";
    const [ratingFeedback, setRatingFeedback] = React.useState<string>("")

    // This function takes in the argument newValue from onFinishRating() which is set as the state in setValue(). 
    // Then it tries to give a rating if the wine is not null. It calls submitRating() with the wine title and 
    // newValue which can't be null. Then it set the states of wineRating, avgRating and ratingCount based on the 
    // response from submitRating().
    React.useEffect(() => {
        const giveRating = async () => {
            try {
                if (props.title != null && value !== 0) {
                    let ratingResponse = await submitRating(props.title, value);
                    wineRating = ratingResponse[0];
                    avgRating = "Average rating: " + ratingResponse[1] + " / 5";
                    ratingCount = ratingResponse[2];
                    setRatingFeedback(wineRating + "\n \n" + avgRating + "\n" + ratingCount);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        giveRating();
    }, [value, props.title]);


    return (
        <View style={styles.starRating}>
            <AirbnbRating
                onFinishRating={(newValue) => { setValue(newValue) }}
                defaultRating={-1}
                
            />
            <Text>
                {"\n"}
                {ratingFeedback}
            </Text>
        </View>
    );
}

export default WineRating;