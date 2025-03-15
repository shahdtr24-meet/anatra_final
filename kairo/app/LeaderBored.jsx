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

const UserListItem = ({ avatar, name, hours, tokens, arrowIcon }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.listItemContainer, { opacity: fadeAnim }]}>
      <View style={styles.userInfo}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.timeInfo}>
        <Text style={styles.hours}>{hours}</Text>
        <Text style={styles.tokens}>{tokens} tokens</Text>
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
            const tokens = Math.max(0, 500 - hours * 25);
            return {
              name,
              hours: `${hours}h`,
              tokens,
              avatar: avatars[index] || "https://via.placeholder.com/57",
              arrowIcon:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/b44f3be3573319aeb00a18599d58e230bbc81609b25edc1699c22604e9add66c?placeholderIfAbsent=true&apiKey=402205c3c2db45e99239ff06a01c7505",
            };
          })
          .sort((a, b) => parseInt(a.hours) - parseInt(b.hours));
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
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : leaderboardData.length > 0 ? (
              <FlatList
                data={leaderboardData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <UserListItem
                    avatar={item.avatar}
                    name={item.name}
                    hours={item.hours}
                    tokens={item.tokens}
                    arrowIcon={item.arrowIcon}
                  />
                )}
                style={styles.list}
                contentContainerStyle={styles.userListContainer}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                ListHeaderComponent={<View style={{ marginTop: 32 }} />}
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
  },
  headerContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerTitle: {
    fontSize: 26,
    color: "#F8EDE3",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  groupsContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  friendsContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  groupItem: {
    padding: 20,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 10,
  },
  groupNameInput: {
    fontSize: 18,
    padding: 10,
    borderRadius: 12,
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
    gap: 10,
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#0097B2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    transform: [{ scale: 1 }],
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  createButton: {
    backgroundColor: "#00B4D8",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  friendsButton: {
    backgroundColor: "#F8EDE3",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    transform: [{ scale: 1 }],
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: { elevation: 3 },
    }),
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  list: {
    width: "100%",
    maxWidth: 400,
  },
  userListContainer: {
    paddingHorizontal: 22,
    paddingVertical: 32,
  },
  listItemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.02)",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 57,
    height: 57,
    borderRadius: 28.5,
    borderWidth: 2,
    borderColor: "#F0F2F5",
  },
  name: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "600",
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  hours: {
    fontSize: 16,
    color: "#34495E",
    fontWeight: "500",
  },
  tokens: {
    fontSize: 14,
    color: "#00B4D8",
    fontWeight: "600",
    backgroundColor: "rgba(0, 180, 216, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  arrow: {
    width: 9,
    height: 6,
    tintColor: "#7F8C8D",
  },
  divider: {
    height: 8,
  },
  errorMessage: {
    color: "#E74C3C",
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
    fontWeight: "500",
  },
  loadingText: {
    fontSize: 16,
    color: "#95A5A6",
    textAlign: "center",
    marginTop: 10,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: "rgba(0, 151, 178, 0.95)",
  },
  statusIcons: {
    flexDirection: "row",
    gap: 6,
  },
  statusIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#F8EDE3",
    opacity: 0.3,
    borderRadius: 4,
  },
  friendItem: {
    padding: 12,
    fontSize: 16,
    color: "#2C3E50",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 8,
  },
});

export default GroupsScreen;