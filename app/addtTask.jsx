import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { router } from "expo-router";

// Generate 7-day calendar starting today
const generateWeek = () => {
  const days = [];
  const today = new Date();
  for (let i = -3; i <= 3; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
};

const AddTask = ({ navigation }) => {
  const [calendar] = useState(generateWeek());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");

  const handleAddTask = () => {
    if (!title || !time) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      desc,
      time,
      date: selectedDate.toDateString(),
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setTime("");
    setDesc("");
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
          <Ionicons name="add" size={22} color="white" />
          <Text style={styles.addBtnText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.calendar}>
        {calendar.map((date) => {
          const isToday =
            date.toDateString() === new Date().toDateString();
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity
              key={date.toDateString()}
              style={[
                styles.dayContainer,
                isSelected && styles.dayActive,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dayName,
                  (isToday || isSelected) && styles.dayNameActive,
                ]}
              >
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  (isToday || isSelected) && styles.dayNumberActive,
                ]}
              >
                {date.getDate()}
              </Text>
              {isToday && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tasks List */}
      <FlatList
        data={tasks.filter(
          (task) => task.date === selectedDate.toDateString()
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 20, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            {item.desc ? (
              <Text style={styles.taskDesc}>{item.desc}</Text>
            ) : null}
            <Text style={styles.taskTime}>{item.time}</Text>
          </View>
        )}
      />

      {/* Add Task Modal */}
      <Modal visible={showForm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View
            entering={FadeInUp.duration(500)}
            exiting={FadeOutDown.duration(500)}
            style={styles.form}
          >
            <Text style={styles.formTitle}>New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, { height: 70 }]}
              placeholder="Description"
              value={desc}
              onChangeText={setDesc}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Time (e.g. 10:30 AM)"
              value={time}
              onChangeText={setTime}
            />

            <View style={styles.formActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowForm(false)}
              >
                <Text style={{ color: "#666" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddTask}>
                <Text style={{ color: "white" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#60a5fa",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
  },
  addBtnText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "bold",
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },
  dayActive: {
    backgroundColor: "#f0f8ff",
  },
  dayName: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  dayNameActive: {
    color: "#60a5fa",
    fontWeight: "700",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  dayNumberActive: {
    color: "#60a5fa",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#60a5fa",
    marginTop: 3,
  },
  taskCard: {
    backgroundColor: "#ff80ab", // bright pink
    padding: 16,
    borderRadius: 12,
  },
  taskTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDesc: {
    color: "white",
    marginTop: 6,
    fontSize: 14,
    opacity: 0.9,
  },
  taskTime: {
    color: "white",
    marginTop: 8,
    fontSize: 13,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 12,
  },
  cancelBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  saveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#60a5fa",
    borderRadius: 8,
  },
});
