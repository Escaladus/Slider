/**
 * //Libraries
 * npm i react-native-pager-view
 * npm i date-fns
 */

import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from "date-fns";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  }
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });
  acc.push(allDays);
  return acc;
}, []);

export default function App() {
  return (
    <PagerView style={styles.PagerContainer}>
      {dates.map((week, i) => {
        return (
          <View key={i}>
            <View style={styles.row}>
              {week.map((day) => {
                const txt = format(day, "EEEEE");
                return (
                  <View>
                    <Text>{txt}</Text>
                    <Text>{day.getDate()}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  PagerContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
