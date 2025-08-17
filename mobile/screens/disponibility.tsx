import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Button,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Easing,
  Alert,
} from "react-native";
import { Calendar, Mode } from "react-native-big-calendar";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Event = {
  title: string;
  start: Date;
  end: Date;
  color?: string;
};

interface Dispo {
  id: string;
  date: string;
  hdeb: string;
  hfin: string;
}

const events: Event[] = [
  {
    title: "",
    start: new Date(2025, 7, 18, 8, 0),
    end: new Date(2025, 7, 18, 12, 0),
    color: "#4CAF50",
  },
  {
    title: "",
    start: new Date(2025, 7, 19, 9, 0),
    end: new Date(2025, 7, 19, 11, 30),
    color: "#2196F3",
  },
  {
    title: "",
    start: new Date(2025, 7, 19, 14, 0),
    end: new Date(2025, 7, 19, 16, 0),
    color: "#FF5722",
  },
];

export default function DisponibilityCalendar() {
  const [mode, setMode] = useState<Mode>("week");
  const [date, setDate] = useState(new Date(2025, 7, 18));

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [heureDebut, setHeureDebut] = useState<string>("");
  const [heureFin, setHeureFin] = useState<string>("");
  const [dateDispo, setDateDispo] = useState<string>("");

  const slideAnim = useRef(new Animated.Value(500)).current;

  const [pickerMode, setPickerMode] = useState<"debut" | "fin" | "date" | null>(
    null
  );
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (event.type === "set" && selectedDate) {
      const formatted = formatTime(selectedDate);

      const formatedDate = formatDate(selectedDate);

      if (pickerMode === "debut") {
        setHeureDebut(formatted);
      } else if (pickerMode === "fin") {
        setHeureFin(formatted);
      } else if (pickerMode === "date") {
        setDateDispo(formatedDate);
      }
    }
  };

  const saveDispo = () => {
    if (!dateDispo || !heureDebut || !heureFin) {
      Alert.alert("Veuillez remplir les champs s'il vous plait!");
    }

    const newDispo: Omit<Dispo, "id"> = {
      date: dateDispo,
      hdeb: heureDebut,
      hfin: heureFin,
    };

    Alert.alert(newDispo.date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            setDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
            )
          }
        >
          <Text style={styles.navBtn}>◀</Text>
        </TouchableOpacity>

        <Text style={styles.dateText}>
          {date.toLocaleDateString("fr-FR", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            )
          }
        >
          <Text style={styles.navBtn}>▶</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modeSwitch}>
        {["day", "3days", "week", "month"].map((m) => (
          <TouchableOpacity key={m} onPress={() => setMode(m as Mode)}>
            <Text style={[styles.modeBtn, mode === m && styles.activeMode]}>
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Calendar
        events={events}
        height={600}
        mode={mode}
        date={date}
        swipeEnabled={true}
        weekStartsOn={1}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />

          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              <Text style={styles.title}>Ajouter une programme</Text>

              <TouchableOpacity
                onPress={() => {
                  setPickerMode("date");
                  setShowTimePicker(true);
                }}
                style={styles.input}
              >
                <Text style={{ color: dateDispo ? "#000" : "#999" }}>
                  {dateDispo || "Date cible"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPickerMode("debut");
                  setShowTimePicker(true);
                }}
                style={styles.input}
              >
                <Text style={{ color: heureDebut ? "#000" : "#999" }}>
                  {heureDebut || "Heure de début"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPickerMode("fin");
                  setShowTimePicker(true);
                }}
                style={styles.input}
              >
                <Text style={{ color: heureFin ? "#000" : "#999" }}>
                  {heureFin || "Heure de fin"}
                </Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode={pickerMode === "date" ? "date" : "time"}
                  is24Hour={true}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChange}
                />
              )}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  saveDispo();
                  //   setModalVisible(false);
                }}
              >
                <Text style={styles.addButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  addButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2f95dc",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 100,
  },
  navBtn: { fontSize: 20, fontWeight: "bold", color: "#333" },
  dateText: { fontSize: 18, fontWeight: "600", color: "#333" },
  modeSwitch: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  modeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  activeMode: {
    backgroundColor: "#2196F3",
    color: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  calendar: { marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10, fontWeight: "600" },
  courseItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  courseInfo: {
    flex: 1,
  },
  courseText: { fontSize: 16 },
  input: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#2f95dc",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
