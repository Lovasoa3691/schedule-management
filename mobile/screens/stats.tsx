import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Icon } from "react-native-vector-icons/Icon";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {
  const subjects = [
    { name: "Java", credit: 20, done: 2, color: "#f39c12" },
    { name: "UML", credit: 15, done: 4, color: "#27ae60" },
    { name: "C#", credit: 18, done: 6, color: "#2980b9" },
    { name: "Droit", credit: 12, done: 3, color: "#8e44ad" },
    { name: "C++", credit: 25, done: 25, color: "#e74c3c" },
  ];

  const labels = subjects.map((s) => s.name);
  const dataDone = subjects.map((s) => s.done);

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 8 }}>
        <Text style={styles.title}>Performance hebdomadaire</Text>

        <LineChart
          data={{
            labels,
            datasets: [{ data: dataDone }],
          }}
          width={Dimensions.get("window").width - 16}
          height={300}
          yAxisSuffix="h"
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#f9f9f9",
            backgroundGradientTo: "#f1f1f1",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: () => "#333",
            propsForDots: {
              r: "3",
              strokeWidth: "1",
              stroke: "#007bff",
            },
            style: { borderRadius: 16 },
          }}
          style={styles.chart}
          bezier
        />

        {subjects.map((s, index) => {
          const remaining = s.credit - s.done;
          const completed = s.done >= s.credit;

          return (
            <View key={index} style={styles.card}>
              <View style={[styles.colorBar, { backgroundColor: s.color }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.subjectName}>{s.name}</Text>
                <Text style={styles.details}>Crédit total : {s.credit}h</Text>
                <Text style={styles.details}>
                  Accompli : {s.done}h | Restant : {remaining}h
                </Text>
              </View>

              <View>
                {completed && (
                  <Text
                    style={{
                      backgroundColor: "#2ecc71",
                      padding: 3,
                      borderRadius: 6,
                      color: "white",
                      width: 90,
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    Complete
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f2f6fc" },
  colorBar: {
    width: 10,
    height: "100%",
    borderRadius: 4,
    marginRight: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
});
