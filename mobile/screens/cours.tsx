import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Animated,
  Easing,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
// import Animated from 'react-native-reanimated';

type coursesList = {
  id: string;
  hDeb: string;
  hFin: string;
  jour: string;
  salle: string;
  localisation: string;
  mention: string;
  niveau: string;
  status: string;
  matiere: string;
  completed: boolean;
};

export default function courses(): React.JSX.Element {
  const [subject, setSubject] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const formatdate = (date: Date) => {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return `${hour}:${minutes}`.padStart(2, "0");
  };
  const [courses, setCourses] = useState<coursesList[]>([
    {
      id: "1",
      hDeb: formatdate(date),
      hFin: formatdate(date),
      status: "En cours",
      mention: "INFO",
      niveau: "M1",
      salle: "7A",
      localisation: "1er etage",
      matiere: "Java Web",
      jour: date.toISOString().split("T")[0],
      completed: false,
    },
    {
      id: "2",
      hDeb: formatdate(date),
      hFin: formatdate(date),
      status: "En cours",
      mention: "INFO",
      niveau: "M1",
      salle: "7A",
      localisation: "1er etage",
      matiere: "CAE",
      jour: date.toISOString().split("T")[0],
      completed: false,
    },
    {
      id: "3",
      hDeb: formatdate(date),
      hFin: formatdate(date),
      status: "Terminé",
      mention: "INFO",
      niveau: "M1",
      salle: "7A",
      localisation: "1er etage",
      matiere: "C#",
      jour: date.toISOString().split("T")[0],
      completed: false,
    },
    {
      id: "4",
      hDeb: formatdate(date),
      hFin: formatdate(date),
      status: "Terminé",
      mention: "INFO",
      niveau: "M1",
      salle: "7A",
      localisation: "1er etage",
      matiere: "UML",
      jour: date.toISOString().split("T")[0],
      completed: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(500)).current;

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

  // const addcours = () => {
  //   if (!subject || !notes) {
  //     Alert.alert("Champs requis", "Sujet et notes sont obligatoires.");
  //     return;
  //   }

  //   const newcours: coursesList = {
  //     id: "1",
  //     hDeb: notes,
  //     hFin: notes,
  //     status: notes,
  //     mention: notes,
  //     niveau: notes,
  //     salle: notes,
  //     matiere: notes,
  //     jour: date.toISOString().split("T")[0],
  //     completed: false,
  //   };

  //   setCourses((prev) => [...prev, newcours]);
  //   setSubject("");
  //   setNotes("");
  //   setDate(new Date());
  //   Alert.alert("Ajouté", "Tâche de révision ajoutée.");
  // };

  const toggleComplete = (id: string) => {
    setCourses((prev) =>
      prev.map((cours) =>
        cours.id === id ? { ...cours, completed: !cours.completed } : cours
      )
    );
  };

  const getStatus = (
    cours: coursesList
  ): "À venir" | "En cours" | "Terminé" => {
    if (cours.completed) return "Terminé";

    const today = new Date();
    const target = new Date(cours.jour);
    if (target > today) return "À venir";

    return "En cours";
  };

  const cancelCours = (id: string) => {
    Alert.alert("Annulation", "Voulez-vous annuler cette courses ?", [
      { text: "Non", style: "cancel" },
      {
        text: "Oui",
        onPress: () =>
          setCourses((prev) => prev.filter((cours) => cours.id !== id)),
        style: "destructive",
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Liste de mes cours</Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Vous n'avez pas du courses cette semaine.
          </Text>
        }
        renderItem={({ item }) => {
          const status = getStatus(item);
          const statusColor =
            status === "Terminé"
              ? "#4caf50"
              : status === "En cours"
              ? "#ff9800"
              : "#2196f3";

          return (
            <View
              style={[
                styles.coursItem,
                item.completed && { backgroundColor: "#e6f4ea" },
              ]}
            >
              <View style={styles.coursHeader}>
                <Text style={styles.coursTitle}>
                  {item.hDeb} à {item.hFin} ({item.matiere})
                </Text>
                <TouchableOpacity onPress={() => cancelCours(item.id)}>
                  <Text
                    style={{
                      color: "white",
                      padding: 5,
                      backgroundColor: "#e53935",
                      borderRadius: 5,
                    }}
                  >
                    Annuler
                  </Text>
                  {/* <Ionicons name="trash-outline" size={20} color="#f14d4aff" /> */}
                </TouchableOpacity>
              </View>
              <Text style={styles.coursNotes}>
                {item.mention} {item.niveau} | Salle {item.salle} au {item.localisation}
              </Text>
              <Text style={styles.coursDate}> {item.jour} </Text>
              <Text style={[styles.coursestatus, { color: statusColor }]}>
                {status === "Terminé" ? "✔" : status === "En cours" ? "" : ""}{" "}
                {status}
              </Text>

              {!item.completed && (
                <TouchableOpacity
                  onPress={() => toggleComplete(item.id)}
                  style={styles.completeButton}>
                  <Ionicons name="checkmark-done" size={18} color="#fff" />
                  <Text style={styles.completeText}>Marquer comme fait</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      {/* <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity> */}

      {/* <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />

          <Animated.View
            style={[
              styles.modalContent,
              {transform: [{translateY: slideAnim}]},
            ]}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <Text style={styles.title}>Ajouter une Révision</Text>

              <TextInput
                style={styles.input}
                placeholderTextColor={'#999'}
                placeholder="Sujet"
                value={subject}
                onChangeText={setSubject}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={'#999'}
                placeholder="Notes / Objectifs"
                value={notes}
                onChangeText={setNotes}
              />

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}>
                <Text style={styles.dateText}>
                  Date cible : {date.toDateString()}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  addcours();
                  setModalVisible(false);
                }}>
                <Text style={styles.addButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Modal> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f2f6fc" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "#e3e8ef",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  dateText: { fontSize: 16 },

  coursItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  coursTitle: { fontWeight: "bold",color:"#555", fontSize: 18 },
  coursNotes: { fontSize: 14, color: "#555" },
  doneText: { color: "green", fontWeight: "bold", marginTop: 5 },

  addButton: {
    marginTop: 20,
    backgroundColor: "#2f95dc",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
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
  coursHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  coursDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  coursestatus: {
    fontWeight: "bold",
    marginTop: 6,
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: "#4caf50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  completeText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
});
