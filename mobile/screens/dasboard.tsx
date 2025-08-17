import axios from "axios";
import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface Seance {
  hDeb: string;
  hFin: string;
  matiere: string;
  salle: string;
}

const Dashboard: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [prochaineSeance, setProchaineSeance] = useState<Seance | null>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [userName, setUserName] = useState("");

  const getUser = async (id: number) => {
    try {
      const response = await axios.get(
        // `https://assitantetudiant.onrender.com/api/users/${id}`,
        `http://192.168.137.43:5000/api/users/${id}`
      );
      setUserName(response.data.nom);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(
          "Erreur",
          "Impossible de récupérer les informations de l’utilisateur. Veuillez réessayer plus tard."
        );
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur inconnue est survenue. Veuillez réessayer plus tard."
        );
      }
    }
  };

  useEffect(() => {
    // getUser(1);
  }, []);

  const emploiDuTemps: Seance[] = [
    { hDeb: "21:00", hFin: "23:00", matiere: "C#", salle: "A1" },
    { hDeb: "22:00", hFin: "23:00", matiere: "UML", salle: "A1" },
    { hDeb: "23:00", hFin: "23:00", matiere: "JAVA WEB", salle: "A1" },
    {
      hDeb: "16:00",
      hFin: "23:00",
      matiere: "Droit de l'informatique",
      salle: "A1",
    },
  ];

  const taches: string[] = [
    "Projet Java (à corriger demain)",
    "Projet C# (lundi prochain)",
  ];

  const resumeSemaine = [
    { jour: "Lundi", cours: 2 },
    { jour: "Mardi", cours: 1 },
    { jour: "Mercredi", cours: 0 },
    { jour: "Jeudi", cours: 3 },
    { jour: "Vendredi", cours: 1 },
  ];

  useEffect(() => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(dateStr);

    const seanceAVenir = emploiDuTemps.find((seance) => {
      const [hours, minutes] = seance.hDeb.split(":").map(Number);
      const seanceTime = new Date();
      seanceTime.setHours(hours, minutes, 0, 0);
      return seanceTime > now;
    });

    if (seanceAVenir) {
      setProchaineSeance(seanceAVenir);
      const interval = setInterval(() => {
        const now = new Date();
        const [h, m] = seanceAVenir.hDeb.split(":").map(Number);
        const target = new Date();
        target.setHours(h, m, 0, 0);
        const diff = target.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeLeft("La séance commence !");
          clearInterval(interval);
          return;
        }

        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeLeft("Aucune autre séance aujourd’hui.");
    }
  }, []);

  const hPrevue = 60;
  const hEffectue = 48;
  const performance = hPrevue > 0 ? (hEffectue / hPrevue) * 100 : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenue {userName} !</Text>
      <Text style={styles.date}>
        {currentDate} |{" "}
        <MaterialIcons name="wb-sunny" size={20} color="#fbc02d" /> 25°C
      </Text>

      {prochaineSeance && (
        <View
          style={[
            styles.card,
            {
              backgroundColor: "rgba(29, 149, 204, 1)",
              borderRadius: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 5,
              padding: 6,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons name="time-outline" size={100} color="#f4fbffff" />
            <View>
              {/* <Text style={{ fontSize: 18, fontWeight: "600" }}>
                Prochaine séance
              </Text> */}
              <Text
                style={{ fontSize: 16, color: "#d6d6d6ff", marginBottom: 4 }}
              >
                {prochaineSeance.hDeb} - {prochaineSeance.hFin} |{" "}
                {prochaineSeance.matiere}
              </Text>
              <Text
                style={{ fontSize: 16, color: "#d6d6d6ff", marginBottom: 4 }}
              >
                Salle {prochaineSeance.salle} | {prochaineSeance.salle}
              </Text>
              <Text style={{ fontSize: 14, color: "#d6d6d6ff" }}>
                Débute dans :{" "}
                <Text style={{ fontWeight: "600", fontSize: 22 }}>
                  {timeLeft}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.card}>
        <View style={[styles.iconTitle, { paddingBottom: 8 }]}>
          <Ionicons name="calendar-outline" size={20} color="#2980b9" />
          <Text style={styles.cardTitle}> Votre programme d'aujourd’hui</Text>
        </View>

        {emploiDuTemps.map((seance, index) => {
          const now = new Date();
          const [startHour, startMinute] = seance.hDeb.split(":").map(Number);
          const startTime = new Date();
          startTime.setHours(startHour, startMinute, 0, 0);

          const endTime = new Date(startTime);
          endTime.setHours(startTime.getHours() + 2);

          let statut = "";
          if (now < startTime) {
            statut = "À venir";
          } else if (now >= startTime && now <= endTime) {
            statut = "En cours";
          } else {
            statut = "Terminé";
          }

          const statutColor =
            statut === "En cours"
              ? "#27ae60"
              : statut === "Terminé"
              ? "#c0392b"
              : "#2980b9";

          return (
            <View key={index} style={styles.seanceItem}>
              <Text style={styles.cardContent}>
                {seance.hDeb} - {seance.hFin} | {seance.matiere}
              </Text>
              <Text style={styles.cardContent}>Salle {seance.salle}</Text>
              <Text style={[styles.statut, { color: statutColor }]}>
                <Ionicons
                  name={
                    statut === "En cours"
                      ? "play-circle-outline"
                      : statut === "Terminé"
                      ? "checkmark-done-outline"
                      : "time-outline"
                  }
                  size={16}
                  color={statutColor}
                />{" "}
                {statut}
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#929995ff",
                  marginTop: 7,
                }}
              ></View>
            </View>
          );
        })}
      </View>

      <View style={styles.card}>
        <View style={styles.iconTitle}>
          {/* <Ionicons name="stats-chart-outline" size={20} color="#2980b9" /> */}
          <Text style={styles.cardTitle}>Resume de la semaine</Text>
        </View>
        {resumeSemaine.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                height: 50,
                paddingBottom: 8,
                flexDirection: "row",
                padding: 5,
                alignItems: "center",

                borderColor: "#2ecc76",
              }}
            >
              <View style={[styles.colorBar, { backgroundColor: "orange" }]} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}
                >
                  {item.jour}
                </Text>
              </View>
              <View style={{}}>
                <Text
                  style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}
                >
                  {item.cours === 0 ? "Aucune" : item.cours}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.card}>
        <View style={styles.iconTitle}>
          <Ionicons name="flash-outline" size={20} color="#2980b9" />
          <Text style={styles.cardTitle}>Actions rapides</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            borderRadius: 5,
            padding: 10,
            borderColor: "#339adfff",
            borderWidth: 1,
            marginBottom: 15,
          }}
        >
          <Ionicons name="add" size={28} color="#686868ff" />
          <Text style={{ color: "#686868ff", fontSize: 16 }}>
            Voir historique
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            borderRadius: 5,
            padding: 10,
            borderColor: "#339adfff",
            borderWidth: 1,
            marginBottom: 15,
          }}
        >
          <Ionicons name="add" size={28} color="#686868ff" />
          <Text style={{ color: "#686868ff", fontSize: 16 }}>
            Voir historique
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            borderRadius: 5,
            padding: 10,
            borderColor: "#339adfff",
            borderWidth: 1,
            marginBottom: 15,
          }}
        >
          <Ionicons name="add" size={28} color="#686868ff" />
          <Text style={{ color: "#686868ff", fontSize: 16 }}>
            Voir historique
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  colorBar: {
    width: 10,
    height: "100%",
    borderRadius: 4,
    marginRight: 12,
  },
  iconTitle: {
    // display: 'flex',
    // justifyContent: 'flex-start',
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },

  info: {
    fontSize: 16,
    marginVertical: 2,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  date: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLink: {},
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2f95dc",
  },
  cardContent: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  countdown: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,

    color: "#d35400",
  },
  chatButton: {
    marginTop: 20,
    backgroundColor: "#2f95dc",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  seanceItem: {
    marginBottom: 10,
  },
  statut: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
  },
});

export default Dashboard;
