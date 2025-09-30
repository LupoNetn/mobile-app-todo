import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Link } from "expo-router";

const Home = () => {
  const tasks = [
    {
      id: 1,
      title: "Team Meeting",
      desc: "Group discussions for the new project.",
      time: "10:00 AM",
      color: "#605afa",
    },
    {
      id: 2,
      title: "UI Design",
      desc: "Make a nice ui design for the homepage component",
      time: "11:00 AM",
      color: "#ef4444",
    },
    {
      id: 3,
      title: "Stand up",
      desc: "Make a nice presentation for the standup today",
      time: "11:30 AM",
      color: "#22c55e",
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <Animated.View
          style={styles.header}
          entering={FadeInDown.duration(600).springify()}
        >
          <TouchableOpacity style={styles.menu}>
            <Ionicons name="menu" size={35} color={"#60a5fa"} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="person-circle" size={43} color={"#6e6e6e"} />
          </TouchableOpacity>
        </Animated.View>

        {/* Greeting */}
        <Animated.View
          style={{ marginTop: 40 }}
          entering={FadeInUp.duration(800).springify()}
        >
          <Text style={styles.greeting}>Good Morning, Tobi</Text>
          <Text style={styles.taskInfo}>
            You have <Text style={{ color: "#60a5fa" }}>3 tasks</Text> this
            month 👍🏾
          </Text>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View
          entering={FadeInDown.duration(800).springify()}
          style={styles.inputContainer}
        >
          <Ionicons name="search" size={26} style={styles.inputBtn} />
          <TextInput
            style={styles.input}
            placeholder="Search for your tasks here..."
            placeholderTextColor="#9ca3af"
          />
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(700).springify()}
          style={styles.quickActions}
        >
          <View style={styles.iconBg}>
            <View style={[styles.iconInner, { backgroundColor: "#ffe4ec" }]}>
              <Ionicons name="checkmark-done-circle" color={"#ff4f81"} size={38} />
            </View>
          </View>
          <View style={styles.iconBg}>
            <View style={[styles.iconInner, { backgroundColor: "#fff9e6" }]}>
              <Ionicons name="list" color={"#fbbf24"} size={38} />
            </View>
          </View>
          <View style={styles.iconBg}>
            <View style={[styles.iconInner, { backgroundColor: "#e8f5e9" }]}>
              <Ionicons name="refresh-circle" color={"#22c55e"} size={38} />
            </View>
          </View>
        </Animated.View>

        {/* Tasks Section */}
        <View style={{ marginTop: 48 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>
                <Link href='/addtTask'>See All</Link>
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={tasks}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              marginTop: 16,
              paddingVertical: 12,
            }}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeInUp.delay(index * 150).duration(600).springify()}
                style={[styles.taskCard, { backgroundColor: item.color }]}
              >
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDesc}>{item.desc}</Text>
                <Text style={styles.taskTime}>{item.time}</Text>
              </Animated.View>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menu: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: "#f5f5f5",
  },
  greeting: {
    color: "#9ca3af",
    fontSize: 20,
    fontWeight: "600",
  },
  taskInfo: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },
  inputContainer: {
    position: "relative",
    marginTop: 35,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 42,
    paddingVertical: 14,
    borderRadius: 12,
    borderColor: "#e5e7eb",
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  inputBtn: {
    position: "absolute",
    top: 14,
    left: 10,
    color: "#9ca3af",
  },
  quickActions: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBg: {
    backgroundColor: "#f5f5f5",
    padding: 18,
    borderRadius: 35,
  },
  iconInner: {
    borderRadius: 100,
    padding: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  sectionLink: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9ca3af",
  },
  taskCard: {
    padding: 20,
    borderRadius: 14,
    width: 260,
    justifyContent: "space-between",
  },
  taskTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  taskDesc: {
    marginTop: 18,
    fontSize: 15,
    color: "#f3f4f6",
    lineHeight: 20,
  },
  taskTime: {
    marginTop: 16,
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
});
