import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  TextInput,
  Modal,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomNav from "./BottomNav";

const BackIcon = () => (
  <Svg width="33" height="33" viewBox="0 0 33 33" fill="none">
    <Path
      d="M11.3394 14.823L15.1729 10.9787C15.691 10.4592 15.6904 9.6183 15.1716 9.09954C14.6524 8.58026 13.8104 8.58026 13.2912 9.09954L6.62825 15.7624C6.41106 15.9796 6.41106 16.3318 6.62825 16.549L13.2912 23.2119C13.8104 23.7312 14.6524 23.7312 15.1716 23.2119C15.6904 22.6931 15.691 21.8522 15.1729 21.3327L11.3394 17.4885H26.226C26.9621 17.4885 27.5588 16.8918 27.5588 16.1557C27.5588 15.4197 26.9621 14.823 26.226 14.823H11.3394Z"
      fill="#324646"
    />
  </Svg>
);

const LeftArrowIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="#F8EDE3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const RightArrowIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke="#F8EDE3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#098CB4" />
    <Path d="M8 12L10 14L16 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FlameIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 2.39 1.19 4.5 3 5.83L12 22l4-7.17C17.81 13.5 19 11.39 19 9c0-3.87-3.13-7-7-7zm0 15l-2-3.5c-.67-.83-1-1.83-1-2.83 0-2.76 2.24-5 5-5s5 2.24 5 5c0 1-0.33 2-1 2.83L12 17z"
      fill="url(#fireGradient)"
    />
    <Defs>
      <LinearGradient id="fireGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FF4500" />
        <Stop offset="1" stopColor="#FFA500" />
      </LinearGradient>
    </Defs>
  </Svg>
);

const TaskItem = ({ title, time, completed, onComplete }) => (
  <TouchableOpacity 
    style={[styles.taskItem, completed && styles.completedTask]}
    onPress={onComplete}
  >
    <View style={styles.taskIcon}>
      {completed ? (
        <CheckIcon />
      ) : (
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6c1669d0651f2a7588c033f37e72cb6491d74fe0" }}
          style={styles.taskIconImage}
          accessibilityLabel="Task icon"
        />
      )}
    </View>
    <View style={styles.taskContent}>
      <Text style={[styles.taskTitle, completed && styles.completedText]}>{title}</Text>
      <Text style={[styles.taskTime, completed && styles.completedText]}>{time}</Text>
    </View>
  </TouchableOpacity>
);

const EventItem = ({ title, time }) => (
  <View style={styles.eventItem}>
    <View style={styles.eventIcon}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
          fill="#098CB4"
        />
      </Svg>
    </View>
    <View style={styles.eventContent}>
      <Text style={styles.eventTitle}>{title}</Text>
      <Text style={styles.eventTime}>{time}</Text>
    </View>
  </View>
);

const TaskCalendar = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date("2025-03-15"));
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date("2025-03-15"));
  const [activeTab, setActiveTab] = useState("Tasks");
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rewardModalVisible, setRewardModalVisible] = useState(false);
  const [rewardTokens, setRewardTokens] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(new Date("2025-03-15"));
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Study");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const categories = [
    ["Study", "Meeting", "Coding"],
    ["BDE", "Testing", "Quick call"],
  ];

  useEffect(() => {
    const now = new Date("2025-03-15");
    setSelectedDate(now);
    setCurrentMonthDate(now);
    setTaskDate(now);
    setStartTime(now);
    const end = new Date(now);
    end.setHours(now.getHours() + 1);
    setEndTime(end);

    const todayTasks = [
      {
        id: 1,
        title: "Review Calculus Chapter 5",
        date: new Date("2025-03-15"),
        time: "9:00 am - 10:00 am",
        relativeTime: "Today",
        description: "Go over derivatives and integrals",
        category: "Study",
        completed: false,
      },
      {
        id: 2,
        title: "Complete Physics Assignment",
        date: new Date("2025-03-15"),
        time: "11:00 am - 12:30 pm",
        relativeTime: "Today",
        description: "Solve problems on thermodynamics",
        category: "Study",
        completed: false,
      },
      {
        id: 3,
        title: "Read Literature Book",
        date: new Date("2025-03-15"),
        time: "2:00 pm - 3:30 pm",
        relativeTime: "Today",
        description: "Chapters 3-5 of assigned novel",
        category: "Study",
        completed: false,
      },
    ];
    setTasks(todayTasks);
  }, []);

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push({
        label: day.toLocaleString("en-US", { weekday: "short" }),
        date: day.getDate(),
        fullDate: day,
        isToday: day.toDateString() === new Date("2025-03-15").toDateString(),
      });
    }
    return weekDays;
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonthDate);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonthDate(newMonth);
    setSelectedDate(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonthDate);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonthDate(newMonth);
    setSelectedDate(newMonth);
  };

  const weekDays = getWeekDays(selectedDate);
  const currentMonth = currentMonthDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  const filteredTasks = tasks.filter(
    (task) => task.date.toDateString() === selectedDate.toDateString()
  );
  const filteredEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  const getRelativeTime = (date) => {
    const today = new Date("2025-03-15");
    const diffTime = date - today;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  const onDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setTaskDate(selected);
      setCurrentMonthDate(selected);
    }
  };

  const onStartTimeChange = (event, selected) => {
    setShowStartTimePicker(false);
    if (selected) {
      setStartTime(selected);
    }
  };

  const onEndTimeChange = (event, selected) => {
    setShowEndTimePicker(false);
    if (selected) {
      setEndTime(selected);
    }
  };

  const handleCreateTask = () => {
    if (!taskName.trim()) return;
    const newTask = {
      id: tasks.length + 1,
      title: taskName,
      date: new Date(taskDate),
      time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
      relativeTime: getRelativeTime(taskDate),
      description,
      category: selectedCategory,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setModalVisible(false);
    setTaskName("");
    setDescription("");
    setSelectedCategory("Study");
    setTaskDate(selectedDate);
    setStartTime(new Date());
    setEndTime(new Date());
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && !task.completed) {
        const tokens = Math.floor(Math.random() * (1278 - 40 + 1)) + 40;
        setRewardTokens(tokens);
        setRewardModalVisible(true);
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleExtremeChallenge = () => {
    Alert.alert(
      "Extreme Daily Challenge",
      "Complete all tasks today to earn 500 bonus tokens!",
      [{ text: "OK" }]
    );
  };

  const handleNavigation = (route) => {
    console.log(`Navigating to: ${route}`);
    router.push(route);
  };

  const CategoryButton = ({ title, isSelected }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(title)}
      style={[styles.categoryButton, isSelected && styles.selectedCategory]}
    >
      <Text
        style={[styles.categoryText, isSelected && styles.selectedCategoryText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handleNavigation("/ProfileScreen")}
        >
          <BackIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.monthHeader}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.arrowButton}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth}</Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.arrowButton}>
          <RightArrowIcon />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addTaskText}>Add Task</Text>
      </TouchableOpacity>

      <View style={styles.calendarSection}>
        <View style={styles.weekdays}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekdayContainer}>
              <Text
                style={[
                  styles.weekday,
                  day.fullDate.toDateString() === selectedDate.toDateString() && styles.activeWeekday,
                  day.isToday && styles.todayWeekday,
                ]}
              >
                {day.label}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedDate(day.fullDate)}
                style={[
                  styles.dateContainer,
                  day.fullDate.toDateString() === selectedDate.toDateString() && styles.activeDateContainer,
                  day.isToday && styles.todayDateContainer,
                ]}
              >
                <Text
                  style={[
                    styles.date,
                    day.fullDate.toDateString() === selectedDate.toDateString() && styles.activeDate,
                    day.isToday && styles.todayDate,
                  ]}
                >
                  {day.date}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={activeTab === "Tasks" ? styles.tabActive : styles.tab}
          onPress={() => setActiveTab("Tasks")}
        >
          <Text style={activeTab === "Tasks" ? styles.tabTextActive : styles.tabText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === "Events" ? styles.tabActive : styles.tab}
          onPress={() => setActiveTab("Events")}
        >
          <Text style={activeTab === "Events" ? styles.tabTextActive : styles.tabText}>Events</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tasksSection}>
        {activeTab === "Tasks" ? (
          <>
            <Text style={styles.tasksHeader}>Tasks</Text>
            <ScrollView style={styles.taskList}>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskItem 
                    key={task.id} 
                    title={task.title} 
                    time={task.time} 
                    completed={task.completed}
                    onComplete={() => handleCompleteTask(task.id)}
                  />
                ))
              ) : (
                <Text style={styles.placeholderText}>No tasks for this date.</Text>
              )}
            </ScrollView>
          </>
        ) : (
          <>
            <Text style={styles.tasksHeader}>Events</Text>
            <ScrollView style={styles.taskList}>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventItem key={event.id} title={event.title} time={event.time} />
                ))
              ) : (
                <Text style={styles.placeholderText}>No events for this date.</Text>
              )}
            </ScrollView>
          </>
        )}
      </View>

      
      <TouchableOpacity
        style={styles.extremeChallengeButton}
        onPress={handleExtremeChallenge}
      >
        <FlameIcon />
        <Text style={styles.extremeChallengeText}>Extreme Daily Challenge</Text>
      </TouchableOpacity>

      <BottomNav />

      {/* Create Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalView}>
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.backButton}
                  >
                    <BackIcon />
                  </TouchableOpacity>
                  <Text style={styles.modalHeaderTitle}>Create a Task</Text>
                  <View style={styles.headerSpacer} />
                </View>

                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={taskName}
                  onChangeText={setTaskName}
                  placeholder="Enter task name"
                  placeholderTextColor="rgba(46, 58, 89, 0.5)"
                />

                <Text style={styles.label}>Date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateTimeText}>{formatDate(taskDate)}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={taskDate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                  />
                )}

                <View style={styles.timeContainer}>
                  <View style={styles.timeSection}>
                    <Text style={styles.label}>Start Time</Text>
                    <TouchableOpacity
                      style={styles.timeInput}
                      onPress={() => setShowStartTimePicker(true)}
                    >
                      <Text style={styles.dateTimeText}>{formatTime(startTime)}</Text>
                    </TouchableOpacity>
                    {showStartTimePicker && (
                      <DateTimePicker
                        value={startTime}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onStartTimeChange}
                      />
                    )}
                  </View>
                  <View style={styles.timeSection}>
                    <Text style={styles.label}>End Time</Text>
                    <TouchableOpacity
                      style={styles.timeInput}
                      onPress={() => setShowEndTimePicker(true)}
                    >
                      <Text style={styles.dateTimeText}>{formatTime(endTime)}</Text>
                    </TouchableOpacity>
                    {showEndTimePicker && (
                      <DateTimePicker
                        value={endTime}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onEndTimeChange}
                      />
                    )}
                  </View>
                </View>

                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.descriptionInput}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter task description"
                  placeholderTextColor="rgba(46, 58, 89, 0.5)"
                  multiline={true}
                />

                <Text style={styles.label}>Category</Text>
                {categories.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.categoryRow}>
                    {row.map((category) => (
                      <CategoryButton
                        key={category}
                        title={category}
                        isSelected={selectedCategory === category}
                      />
                    ))}
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCreateTask}
                >
                  <Text style={styles.createButtonText}>Create Task</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Reward Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={rewardModalVisible}
        onRequestClose={() => setRewardModalVisible(false)}
      >
        <View style={styles.rewardModalContainer}>
          <View style={styles.rewardModalView}>
            <View style={styles.rewardModalContent}>
              <Text style={styles.rewardTitle}>Task Completed!</Text>
              <Text style={styles.rewardMessage}>
                Congratulations! You've earned
              </Text>
              <Text style={styles.rewardTokens}>{rewardTokens} Tokens</Text>
              <TouchableOpacity
                style={styles.rewardButton}
                onPress={() => setRewardModalVisible(false)}
              >
                <Text style={styles.rewardButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0097B2",
    width: "100%",
    maxWidth: 431,
  },
  header: {
    paddingTop: 42,
    paddingHorizontal: 25,
    paddingBottom: 20,
    alignItems: "center",
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  monthHeader: {
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  monthText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8EDE3",
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  arrowButton: {
    padding: 10,
  },
  addTaskButton: {
    position: "absolute",
    right: 25,
    top: 90,
    backgroundColor: "#098CB4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addTaskText: {
    color: "#F8EDE3",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  calendarSection: {
    paddingHorizontal: 25,
    marginBottom: 20,
    backgroundColor: "#0097B2",
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekdayContainer: {
    alignItems: "center",
  },
  weekday: {
    fontSize: 16,
    color: "#F8EDE3",
    fontWeight: "500",
    marginBottom: 5,
  },
  activeWeekday: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  todayWeekday: {
    color: "#FFA500",
  },
  dateContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  activeDateContainer: {
    backgroundColor: "#098CB4",
  },
  todayDateContainer: {
    borderWidth: 2,
    borderColor: "#FFA500",
  },
  date: {
    fontSize: 16,
    color: "#F8EDE3",
    fontWeight: "500",
  },
  activeDate: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  todayDate: {
    fontWeight: "600",
    color: "#FFA500",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    paddingVertical: 10,
    backgroundColor: "#0097B2",
  },
  tab: {
    opacity: 0.6,
    paddingVertical: 8,
  },
  tabActive: {
    opacity: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#FFA500",
    paddingVertical: 8,
  },
  tabText: {
    color: "#F8EDE3",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: "#F8EDE3",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  tasksSection: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  tasksHeader: {
    color: "#2E3A59",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedTask: {
    backgroundColor: "#E0ECEF",
    opacity: 0.8,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#098CB4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  taskIconImage: {
    width: 24,
    height: 24,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "600",
  },
  taskTime: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  completedText: {
    color: "#098CB4",
    textDecorationLine: "line-through",
  },
  eventItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "600",
  },
  eventTime: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  placeholderText: {
    color: "#7F8C8D",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  extremeChallengeButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#FF4500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#FFA500",
    position: "absolute",
    bottom: 100, 
    alignSelf: "center",
    zIndex: 1,
  },
  extremeChallengeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginLeft: 10,
    textShadowColor: "#FFA500",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
  },
  modalScrollView: {
    flex: 1,
  },
  modalContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  modalHeaderTitle: {
    fontSize: 22,
    color: "#2E3A59",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  headerSpacer: {
    width: 32,
  },
  label: {
    fontSize: 16,
    color: "#098CB4",
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  input: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "500",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E6ED",
  },
  dateTimeText: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "500",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  timeSection: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeInput: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "500",
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    textAlign: "center",
  },
  descriptionInput: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "500",
    paddingHorizontal: 25,
    paddingVertical: 12,
    minHeight: 100,
    textAlignVertical: "top",
    borderRadius: 15,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E6ED",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 25,
    marginTop: 14,
  },
  categoryButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedCategory: {
    backgroundColor: "#098CB4",
    borderColor: "#098CB4",
  },
  categoryText: {
    fontSize: 12,
    color: "#2E3A59",
    fontWeight: "500",
    textAlign: "center",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: "#098CB4",
    borderRadius: 25,
    marginHorizontal: 25,
    marginTop: 30,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 16,
    color: "#F8EDE3",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  rewardModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  rewardModalView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  rewardModalContent: {
    alignItems: "center",
  },
  rewardTitle: {
    fontSize: 22,
    color: "#2E3A59",
    fontWeight: "700",
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  rewardMessage: {
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  rewardTokens: {
    fontSize: 30,
    color: "#FFA500",
    fontWeight: "700",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  rewardButton: {
    backgroundColor: "#098CB4",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardButtonText: {
    fontSize: 16,
    color: "#F8EDE3",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default TaskCalendar;