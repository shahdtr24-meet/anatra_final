import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import Svg, { Path, G, Defs, ClipPath, Rect, LinearGradient, Stop, Circle } from "react-native-svg";
import { useRouter, useLocalSearchParams } from "expo-router";
import BottomNav from "./BottomNav";

const { width } = Dimensions.get("window");

const StatusBarContent = () => (
  <View style={styles.statusBar}>
    <View style={styles.statusIcons}>
      <View style={styles.statusIcon} />
      <View style={styles.statusIcon} />
      <View style={styles.statusIcon} />
    </View>
  </View>
);

const SettingsIcon = () => (
  <Svg width="29" height="28" viewBox="0 0 29 28" fill="none">
    <G opacity="0.7" clipPath="url(#clip0_settings)">
      <Path
        d="M23.0762 14.9291C23.1221 14.5615 23.1566 14.194 23.1566 13.8035C23.1566 13.413 23.1221 13.0455 23.0762 12.6779L25.4996 10.7828C25.7178 10.6106 25.7752 10.3004 25.6374 10.0478L23.3403 6.07383C23.2025 5.82115 22.8924 5.72927 22.6397 5.82115L19.7799 6.96969C19.1826 6.51028 18.5395 6.13126 17.8388 5.84412L17.4024 2.8005C17.3679 2.52485 17.1267 2.31812 16.8396 2.31812H12.2455C11.9583 2.31812 11.7171 2.52485 11.6827 2.8005L11.2462 5.84412C10.5456 6.13126 9.90245 6.52176 9.30521 6.96969L6.44535 5.82115C6.18119 5.71779 5.88257 5.82115 5.74475 6.07383L3.44767 10.0478C3.29836 10.3004 3.36727 10.6106 3.5855 10.7828L6.00891 12.6779C5.96297 13.0455 5.92851 13.4245 5.92851 13.8035C5.92851 14.1825 5.96297 14.5615 6.00891 14.9291L3.5855 16.8241C3.36727 16.9964 3.30985 17.3065 3.44767 17.5592L5.74475 21.5331C5.88257 21.7858 6.19268 21.8777 6.44535 21.7858L9.30521 20.6373C9.90245 21.0967 10.5456 21.4757 11.2462 21.7629L11.6827 24.8065C11.7171 25.0821 11.9583 25.2889 12.2455 25.2889H16.8396C17.1267 25.2889 17.3679 25.0821 17.4024 24.8065L17.8388 21.7629C18.5395 21.4757 19.1826 21.0852 19.7799 20.6373L22.6397 21.7858C22.9039 21.8892 23.2025 21.7858 23.3403 21.5331L25.6374 17.5592C25.7752 17.3065 25.7178 16.9964 25.4996 16.8241L23.0762 14.9291Z"
        fill="#F8EDE3"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_settings">
        <Rect width="27.5649" height="27.5649" fill="white" transform="translate(0.759949 0.0209961)" />
      </ClipPath>
    </Defs>
  </Svg>
);

const GoldMedalIcon = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <Circle cx="22" cy="22" r="20" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
    <Path d="M22 12L27 18H17L22 12Z" fill="#DAA520" />
  </Svg>
);

const SilverMedalIcon = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <Circle cx="22" cy="22" r="20" fill="#C0C0C0" stroke="#A9A9A9" strokeWidth="2" />
    <Path d="M22 12L27 18H17L22 12Z" fill="#A9A9A9" />
  </Svg>
);

const BronzeMedalIcon = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <Circle cx="22" cy="22" r="20" fill="#CD7F32" stroke="#8B4513" strokeWidth="2" />
    <Path d="M22 12L27 18H17L22 12Z" fill="#8B4513" />
  </Svg>
);

const CheckIcon = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 38 38" fill="none">
    <Circle cx="19" cy="19" r="18" stroke="#00FF00" strokeWidth="2" />
    <Path d="M12 19L17 24L26 15" stroke="#00FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GoldMedal = () => (
  <Svg width="57" height="57" viewBox="0 0 57 57" fill="none">
    <Circle cx="28.5" cy="28.5" r="26" fill="#FFD700" stroke="#DAA520" strokeWidth="3" />
    <Path d="M28.5 15L34 23H23L28.5 15Z" fill="#DAA520" />
  </Svg>
);

const SilverMedal = () => (
  <Svg width="60" height="61" viewBox="0 0 60 61" fill="none">
    <Circle cx="30" cy="30.5" r="26" fill="#C0C0C0" stroke="#A9A9A9" strokeWidth="3" />
    <Path d="M30 16L36 24H24L30 16Z" fill="#A9A9A9" />
  </Svg>
);

const BronzeMedal = () => (
  <Svg width="67" height="66" viewBox="0 0 67 66" fill="none">
    <Circle cx="33.5" cy="33" r="26" fill="#CD7F32" stroke="#8B4513" strokeWidth="3" />
    <Path d="M33.5 18L39 26H28L33.5 18Z" fill="#8B4513" />
  </Svg>
);

const CertificationIcon = () => (
  <Svg width="53" height="55" viewBox="0 0 53 55" fill="none">
    <Path d="M10 10H43V40H10V10Z" fill="#F8EDE3" stroke="#2E3A59" strokeWidth="2" />
    <Path d="M26.5 45L33 50L26.5 55L20 50L26.5 45Z" fill="#EDB552" stroke="#2E3A59" strokeWidth="1" />
    <Path d="M15 15H38V25H15Z" fill="none" stroke="#2E3A59" strokeWidth="1" />
  </Svg>
);

const StreakIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="18" fill="#FFA600" stroke="#FF8C00" strokeWidth="2" />
    <Path d="M20 12L24 18H16L20 12Z" fill="#FF8C00" />
    <Text x="18" y="28" fill="#FFF" fontSize="14" fontWeight="bold" textAnchor="middle">4</Text>
  </Svg>
);

const getMedalIcon = (type) => {
  switch (type) {
    case "gold": return <GoldMedalIcon size={44} />;
    case "silver": return <SilverMedalIcon size={44} />;
    case "bronze": return <BronzeMedalIcon size={44} />;
    case "check": return <CheckIcon size={38} />;
    default: return null;
  }
};

const AchievementItem = ({ type, title, subtitle, date, score }) => {
  return (
    <View style={styles.achievementContainer}>
      <View style={styles.medalContainer}>{getMedalIcon(type)}</View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>
        <Text style={styles.details}>{date} • {score}</Text>
      </View>
    </View>
  );
};

const LevelCard = () => (
  <View style={styles.levelCard}>
    <View style={styles.levelInfo}>
      <View style={styles.levelBadge}>
        <Text style={styles.levelNumber}>2</Text>
      </View>
      <View style={styles.levelDetails}>
        <Text style={styles.levelTitle}>Level 2</Text>
        <Text style={styles.levelSubtitle}>500 Points to next level</Text>
      </View>
    </View>
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
      <View style={styles.progressNumbers}>
        <Text style={styles.currentPoints}>5200</Text>
        <Text style={styles.totalPoints}>/6000</Text>
      </View>
    </View>
  </View>
);

const MedalCard = ({ type, count, MedalComponent }) => (
  <View style={styles.medalCard}>
    <View style={styles.medalIcon}>
      <MedalComponent />
    </View>
    <Text style={styles.medalName}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
    <Text style={styles.medalCount}>{count}</Text>
  </View>
);

const StreakCard = ({ streakCount, leaderboardWins }) => (
  <View style={styles.streakCard}>
    <View style={styles.streakIcon}>
      <StreakIcon />
    </View>
    <View style={styles.streakInfo}>
      <Text style={styles.streakTitle}>{streakCount} Day Streak</Text>
      <Text style={styles.streakSubtitle}>{leaderboardWins} Times #1 on Leaderboard</Text>
    </View>
  </View>
);

const MedalsSection = () => (
  <View style={styles.medalsSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Medals</Text>
      <Text style={styles.sectionCount}>53</Text>
    </View>
    <View style={styles.medalsGrid}>
      <MedalCard type="gold" count={24} MedalComponent={GoldMedal} />
      <MedalCard type="silver" count={18} MedalComponent={SilverMedal} />
      <MedalCard type="bronze" count={11} MedalComponent={BronzeMedal} />
    </View>
  </View>
);

const CertificationCard = ({ title }) => (
  <View style={styles.certCard}>
    <View style={styles.certIcon}>
      <CertificationIcon />
    </View>
    <Text style={styles.certName}>{title}</Text>
  </View>
);

const CertificationsSection = () => (
  <View style={styles.certSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Certifications</Text>
      <Text style={styles.sectionCount}>8</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.certifications}>
        <CertificationCard title="Bronze Certified" />
        <CertificationCard title="Silver Certified" />
        <CertificationCard title="Gold Certified" />
      </View>
    </ScrollView>
  </View>
);

const SettingsScreen = ({ onBack, username, setUsername, friendId }) => (
  <View style={styles.settingsContainer}>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Text style={styles.backButtonText}>← Back</Text>
    </TouchableOpacity>
    <Text style={styles.settingsTitle}>Settings</Text>
    <View style={styles.settingsContent}>
      <Text style={styles.settingsLabel}>Username</Text>
      <TextInput
        style={styles.settingsInput}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <Text style={styles.settingsLabel}>Friend ID</Text>
      <Text style={styles.friendIdText}>{friendId}</Text>
    </View>
  </View>
);

const ProfileScreen = () => {
  const router = useRouter();
  const { username: initialUsername } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("STATS");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [username, setUsername] = useState(initialUsername || "Guest");
  const defaultFriendId = "m9926a";
  const defaultLeaderboardWins = 4;
  const defaultStreak = 4;

  const handleNavigation = (route) => {
    console.log(`Navigating to: ${route}`);
    router.push(route);
  };

  const achievements = [
    { type: "gold", title: "Top Performer", subtitle: "Weekly Challenge", date: "Mar 8, 2025", score: "100 pts" },
    { type: "silver", title: "Consistent Learner", date: "Mar 7, 2025", score: "75 pts" },
    { type: "bronze", title: "Task Master", date: "Mar 6, 2025", score: "50 pts" },
    { type: "check", title: "Daily Goal Achieved", date: "Mar 5, 2025", score: "25 pts" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StatusBarContent />
      {isSettingsOpen ? (
        <SettingsScreen
          onBack={() => setIsSettingsOpen(false)}
          username={username}
          setUsername={setUsername}
          friendId={defaultFriendId}
        />
      ) : (
        <>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.profilePic}
            />
            <Text style={styles.profileName}>{username}</Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setIsSettingsOpen(true)}
            >
              <SettingsIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.navTabs}>
            {["STATS", "ACHIEVEMENTS", "ACTIVITY"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={activeTab === tab ? styles.tabActive : styles.tab}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {activeTab === "STATS" ? (
            <View style={styles.statsContainer}>
              <View style={styles.statsCard}>
                <View style={styles.leaderboardSection}>
                  <View style={styles.iconContainer}>
                    <Svg width="24" height="24" viewBox="0 0 28 46" fill="none">
                      <Path
                        d="M7.58331 39.7043H3.49998C2.85831 39.7043 2.33331 38.8535 2.33331 37.8136V18.9067C2.33331 17.8668 2.85831 17.016 3.49998 17.016H7.58331C8.22498 17.016 8.74998 17.8668 8.74998 18.9067V37.8136C8.74998 38.8535 8.22498 39.7043 7.58331 39.7043ZM16.0416 5.67188H11.9583C11.3166 5.67188 10.7916 6.52269 10.7916 7.56257V37.8136C10.7916 38.8535 11.3166 39.7043 11.9583 39.7043H16.0416C16.6833 39.7043 17.2083 38.8535 17.2083 37.8136V7.56257C17.2083 6.52269 16.6833 5.67188 16.0416 5.67188ZM24.5 20.7974H20.4166C19.775 20.7974 19.25 21.6482 19.25 22.6881V37.8136C19.25 38.8535 19.775 39.7043 20.4166 39.7043H24.5C25.1416 39.7043 25.6666 38.8535 25.6666 37.8136V22.6881C25.6666 21.6482 25.1416 20.7974 24.5 20.7974Z"
                        fill="url(#paint0_linear_leaderboard)"
                      />
                      <Defs>
                        <LinearGradient id="paint0_linear_leaderboard" x1="14" y1="5.67187" x2="14" y2="39.7043" gradientUnits="userSpaceOnUse">
                          <Stop stopColor="#967CFD" />
                          <Stop offset="1" stopColor="#3177FF" />
                        </LinearGradient>
                      </Defs>
                    </Svg>
                  </View>
                  <View style={styles.leaderboardInfo}>
                    <Text style={styles.rank}>#1</Text>
                    <Text style={styles.leaderboardTitle}>Leaderboard</Text>
                    <Text style={styles.timeHighlight}>2h</Text>
                    <Text style={styles.subtitle}>Spent on the screen this week</Text>
                  </View>
                </View>
              </View>
              <View style={styles.studyCard}>
                <View style={styles.studyInfo}>
                  <Text style={styles.studyTime}>10h</Text>
                  <Text style={styles.studyText}>Spent studying this week</Text>
                  <Text style={styles.tasksCount}>8</Text>
                  <Text style={styles.tasksText}>Tasks completed this week</Text>
                  <View style={styles.progressSection}>
                    <Text style={styles.progressLabel}>Tasks</Text>
                    <View style={styles.progressBar}>
                      <View style={styles.progressFill} />
                    </View>
                    <Text style={styles.progressText}>78% Completed</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : activeTab === "ACHIEVEMENTS" ? (
            <ScrollView style={styles.achievementsContainer}>
              {achievements.map((achievement, index) => (
                <AchievementItem
                  key={index}
                  type={achievement.type}
                  title={achievement.title}
                  subtitle={achievement.subtitle}
                  date={achievement.date}
                  score={achievement.score}
                />
              ))}
            </ScrollView>
          ) : (
            <ScrollView style={styles.activityContainer}>
              <View style={styles.activityContent}>
                <LevelCard />
                <StreakCard streakCount={defaultStreak} leaderboardWins={defaultLeaderboardWins} />
                <MedalsSection />
                <CertificationsSection />
              </View>
            </ScrollView>
          )}
          <BottomNav />
        </>
      )}
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
  statusBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(0, 151, 178, 0.95)",
  },
  statusIcons: {
    flexDirection: "row",
    gap: 6,
  },
  statusIcon: {
    width: 18,
    height: 18,
    backgroundColor: "#F8EDE3",
    opacity: 0.3,
    borderRadius: 4,
  },
  profileSection: {
    padding: 25,
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#F8EDE3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  profileName: {
    color: "#F8EDE3",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 15,
    letterSpacing: 0.5,
  },
  settingsButton: {
    position: "absolute",
    top: 25,
    right: 25,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navTabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 35,
    paddingVertical: 15,
    backgroundColor: "rgba(0, 151, 178, 0.9)",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    opacity: 0.6,
    borderRadius: 20,
  },
  tabActive: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: {
    color: "#F8EDE3",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  tabTextActive: {
    color: "#F8EDE3",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  statsContainer: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  leaderboardSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconContainer: {
    width: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(151, 124, 253, 0.1)",
    borderRadius: 15,
  },
  leaderboardInfo: {
    flex: 1,
  },
  rank: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E3A59",
    letterSpacing: 0.5,
  },
  leaderboardTitle: {
    color: "#2E3A59",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  timeHighlight: {
    color: "#FFA600",
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: "#7F8C8D",
    fontSize: 14,
    fontWeight: "500",
  },
  studyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  studyInfo: {
    gap: 15,
  },
  studyTime: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFA600",
  },
  studyText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2E3A59",
  },
  tasksCount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFA600",
  },
  tasksText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2E3A59",
  },
  progressSection: {
    marginTop: 15,
  },
  progressLabel: {
    fontWeight: "600",
    color: "#2E3A59",
    fontSize: 15,
    marginBottom: 8,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E0E6ED",
    overflow: "hidden",
  },
  progressFill: {
    width: "78%",
    height: "100%",
    backgroundColor: "#0097B2",
    borderRadius: 6,
  },
  progressText: {
    color: "#7F8C8D",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
    marginTop: 5,
  },
  achievementsContainer: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  achievementContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  medalContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 151, 178, 0.1)",
    borderRadius: 25,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2E3A59",
  },
  details: {
    fontSize: 13,
    color: "#95A5A6",
    fontWeight: "500",
  },
  activityContainer: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  activityContent: {
    padding: 20,
  },
  levelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  levelInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#2E3A59",
    borderRadius: 20,
    backgroundColor: "#1A0F24",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  levelNumber: {
    color: "#F8EDE3",
    fontSize: 18,
    fontWeight: "700",
  },
  levelDetails: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2E3A59",
  },
  levelSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 5,
    fontWeight: "500",
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E0E6ED",
    overflow: "hidden",
  },
  progressFill: {
    width: "85%",
    height: "100%",
    backgroundColor: "#0097B2",
    borderRadius: 6,
  },
  progressNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  currentPoints: {
    color: "#2E3A59",
    fontSize: 15,
    fontWeight: "600",
  },
  totalPoints: {
    color: "#7F8C8D",
    fontSize: 15,
    fontWeight: "500",
  },
  streakCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  streakIcon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E3A59",
  },
  streakSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 5,
    fontWeight: "500",
  },
  medalsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#2E3A59",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  sectionCount: {
    color: "#7F8C8D",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "rgba(0, 151, 178, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  medalsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  medalCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    padding: 15,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medalIcon: {
    marginBottom: 12,
  },
  medalName: {
    fontWeight: "600",
    color: "#2E3A59",
    fontSize: 14,
    marginBottom: 5,
  },
  medalCount: {
    fontWeight: "700",
    color: "#EDB552",
    fontSize: 18,
  },
  certSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  certifications: {
    flexDirection: "row",
    gap: 15,
  },
  certCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    padding: 15,
    width: 130,
    height: 160,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  certIcon: {
    marginBottom: 15,
  },
  certName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2E3A59",
    textAlign: "center",
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButtonText: {
    color: "#0097B2",
    fontSize: 16,
    fontWeight: "600",
  },
  settingsTitle: {
    color: "#2E3A59",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
    letterSpacing: 0.5,
  },
  settingsContent: {
    gap: 20,
  },
  settingsLabel: {
    color: "#2E3A59",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  settingsInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: "#2E3A59",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  friendIdText: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
});

export default ProfileScreen; 