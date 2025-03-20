import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  TextInput,
  Animated,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import BottomNav from "./BottomNav";

const { width } = Dimensions.get("window");

const UserListItem = ({ avatar, name, hours, tokens, arrowIcon, position }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const glowAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const getPositionStyle = () => {
    switch (position) {
      case 1:
        return {
          backgroundColor: "#FFD700",
          shadowColor: "#FFD700",
          borderColor: "#FFA500",
        };
      case 2:
        return {
          backgroundColor: "#C0C0C0",
          shadowColor: "#C0C0C0",
          borderColor: "#999999",
        };
      case 3:
        return {
          backgroundColor: "#CD7F32",
          shadowColor: "#CD7F32",
          borderColor: "#8B4513",
        };
      default:
        return {
          backgroundColor: "#FFFFFF",
          shadowColor: "#000000",
          borderColor: "#E0E0E0",
        };
    }
  };

  const positionStyle = getPositionStyle();

  return (
    <Animated.View
      style={[
        styles.listItemContainer,
        {
          ...positionStyle,
          shadowOpacity: glowAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.15, 0.35],
          }),
        },
        { opacity: fadeAnim },
      ]}
    >
      <View style={styles.positionContainer}>
        <Text style={[styles.positionText, position <= 3 && styles.topPositionText]}>
          #{position}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.timeInfo}>
        <Animated.View
          style={[
            styles.hoursContainer,
            {
              shadowOpacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.1, 0.3],
              }),
            },
          ]}
        >
          <Text style={styles.hours}>{hours}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.tokensContainer,
            {
              shadowOpacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.1, 0.3],
              }),
            },
          ]}
        >
          <Text style={styles.tokens}>{tokens}</Text>
        </Animated.View>
        <Image source={{ uri: arrowIcon }} style={styles.arrow} />
      </View>
    </Animated.View>
  );
};

const StatusBarContent = () => (
  <View style={styles.statusBar}>
    <View style={styles.statusIcons}>
      <View style={styles.statusIcon} />
      <View style={styles.statusIcon} />
      <View style={styles.statusIcon} />
    </View>
  </View>
);

const GroupsScreen = () => {
  const [activeSection, setActiveSection] = useState("groups");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [groups, setGroups] = useState([{ id: 1, name: "Default Group", memberCount: 3 }]);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const namesResponse = await axios.get("https://randommer.io/api/Name", {
          headers: { "X-Api-Key": "d82a85bbce724fff8ab8d6c857f34bd6" },
          params: { quantity: 5, nameType: "fullname" },
        });
        const names = Array.isArray(namesResponse.data) ? namesResponse.data : namesResponse.data.names || [];

        const avatarsResponse = await axios.get("https://randomuser.me/api/?results=5&inc=picture");
        const avatars = avatarsResponse.data.results.map((result) => result.picture.large);

        const leaderboard = names
          .map((name, index) => {
            const hours = Math.floor(Math.random() * 19) + 1;
            const tokens = 500 - (hours * 20);
            return {
              name,
              hours: `${hours}h`,
              tokens,
              avatar: avatars[index] || "https://via.placeholder.com/57",
              arrowIcon:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/b44f3be3573319aeb00a18599d58e230bbc81609b25edc1699c22604e9add66c?placeholderIfAbsent=true&apiKey=402205c3c2db45e99239ff06a01c7505",
            };
          })
          .sort((a, b) => parseInt(a.hours) - parseInt(b.hours))
          .map((item, index) => ({ ...item, position: index + 1 }));
        setLeaderboardData(leaderboard);
        setErrorMessage(null);
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        setErrorMessage("Failed to fetch leaderboard data");
      }
    };

    fetchData();
  }, []);

  const friendsList = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ];

  const handleCreateGroup = () => {
    if (groups.length < 2) {
      const newGroup = {
        id: groups.length + 1,
        name: `Group ${groups.length + 1}`,
        memberCount: 0,
      };
      setGroups([...groups, newGroup]);
    }
  };

  const handleAddMember = (groupId) => {
    setGroups(groups.map(group => 
      group.id === groupId && group.memberCount < 5 
        ? { ...group, memberCount: group.memberCount + 1 }
        : group
    ));
  };

  const handleRenameGroup = (groupId) => {
    if (newGroupName.trim()) {
      setGroups(groups.map(group =>
        group.id === groupId ? { ...group, name: newGroupName } : group
      ));
      setEditingGroupId(null);
      setNewGroupName("");
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "groups":
        return (
          <View style={styles.groupsContainer}>
            <Text style={styles.sectionTitle}>Your Groups (Max 2)</Text>
            {groups.map((group) => (
              <View key={group.id} style={styles.groupItem}>
                {editingGroupId === group.id ? (
                  <TextInput
                    style={styles.groupNameInput}
                    value={newGroupName}
                    onChangeText={setNewGroupName}
                    placeholder="Enter new group name"
                    onSubmitEditing={() => handleRenameGroup(group.id)}
                  />
                ) : (
                  <Text style={styles.groupName}>{group.name}</Text>
                )}
                <Text style={styles.memberCount}>{group.memberCount}/5 members</Text>
                <View style={styles.groupButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      setEditingGroupId(group.id);
                      setNewGroupName(group.name);
                    }}
                  >
                    <Text style={styles.buttonText}>Rename</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleAddMember(group.id)}
                    disabled={group.memberCount >= 5}
                  >
                    <Text style={styles.buttonText}>Add Member</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setActiveSection("leaderboard")}
                  >
                    <Text style={styles.buttonText}>Leaderboard</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {groups.length < 2 && (
              <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
                <Text style={styles.buttonText}>Create New Group</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      case "leaderboard":
        return (
          <View style={styles.content}>
            <Text style={styles.leaderboardTitle}>Leaderboard</Text>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : leaderboardData.length > 0 ? (
              <FlatList
                data={leaderboardData}
                keyExtractor={(item) => item.position.toString()}
                renderItem={({ item }) => (
                  <UserListItem
                    avatar={item.avatar}
                    name={item.name}
                    hours={item.hours}
                    tokens={item.tokens}
                    arrowIcon={item.arrowIcon}
                    position={item.position}
                  />
                )}
                style={styles.list}
                contentContainerStyle={styles.userListContainer}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                ListHeaderComponent={<View style={{ marginTop: 16 }} />}
              />
            ) : (
              <Text style={styles.loadingText}>Loading leaderboard...</Text>
            )}
          </View>
        );
      case "friends":
        return (
          <View style={styles.friendsContainer}>
            <Text style={styles.sectionTitle}>Your Friends</Text>
            <FlatList
              data={friendsList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text style={styles.friendItem}>{item.name}</Text>
              )}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StatusBarContent />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Groups</Text>
        <TouchableOpacity
          style={styles.friendsButton}
          onPress={() => setActiveSection("friends")}
        >
          <Text style={styles.buttonText}>Friends</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0097B2",
    width: "100%",
    maxWidth: 431,
    alignItems: "center",
  },
  headerContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerTitle: {
    fontSize: 28,
    color: "#F8EDE3",
    fontWeight: "700",
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2C3E50",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  groupsContainer: {
    flex: 1,
    width: "100%",
    padding: 25,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  friendsContainer: {
    flex: 1,
    width: "100%",
    padding: 25,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  groupItem: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 10,
  },
  groupNameInput: {
    fontSize: 18,
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  memberCount: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 15,
  },
  groupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    backgroundColor: "#0097B2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  createButton: {
    backgroundColor: "#00B4D8",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  friendsButton: {
    backgroundColor: "#F8EDE3",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  list: {
    width: "100%",
    maxWidth: 400,
  },
  userListContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: "center",
  },
  listItemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 12,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 2,
  },
  positionContainer: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  positionText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#666",
  },
  topPositionText: {
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 14,
    color: "#2C3E50",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hoursContainer: {
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    shadowColor: "#E74C3C",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  hours: {
    fontSize: 12,
    color: "#E74C3C",
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  tokensContainer: {
    backgroundColor: "rgba(46, 204, 113, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    shadowColor: "#2ECC71",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  tokens: {
    fontSize: 12,
    color: "#2ECC71",
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  arrow: {
    width: 10,
    height: 6,
    tintColor: "#7F8C8D",
  },
  divider: {
    height: 8,
  },
  errorMessage: {
    color: "#E74C3C",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  loadingText: {
    fontSize: 16,
    color: "#95A5A6",
    textAlign: "center",
    marginTop: 20,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: "rgba(0, 151, 178, 0.95)",
    width: "100%",
  },
  statusIcons: {
    flexDirection: "row",
    gap: 8,
  },
  statusIcon: {
    width: 22,
    height: 22,
    backgroundColor: "#F8EDE3",
    opacity: 0.3,
    borderRadius: 5,
  },
  friendItem: {
    padding: 15,
    fontSize: 16,
    color: "#2C3E50",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default GroupsScreen;