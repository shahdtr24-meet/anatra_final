import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

// Define Icons
const HomeIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke="#6B606D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 22V12H15V22"
      stroke="#6B606D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke="#6B606D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M16 2V6" stroke="#6B606D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 2V6" stroke="#6B606D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 10H21" stroke="#6B606D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PowerIcon = () => (
  <Svg width="20" height="33" viewBox="0 0 20 33" fill="none">
    <Path
      d="M8.0992 31.286V20.9837H1.4798C0.559051 20.9837 -0.0630734 19.9883 0.384856 19.1671L9.54253 1.32454C10.1149 0.154943 11.8817 0.577988 11.8817 1.89689V12.3237H18.2025C19.1232 12.3237 19.7205 13.2942 19.3223 14.1154L10.4633 31.8335C9.86603 33.028 8.0992 32.605 8.0992 31.286Z"
      fill="white"
    />
  </Svg>
);

const LeaderboardIcon = () => (
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
);

const ProfileIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke="#6B606D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke="#6B606D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const navItems = [
    { route: "/ProfileScreen", icon: <HomeIcon />, label: "Home" },
    { route: "/TaskCalendar", icon: <CalendarIcon />, label: "Calendar" },
    { route: "/Shop", icon: <PowerIcon />, label: "Shop", isCenter: true },
    { route: "/LeaderBored", icon: <LeaderboardIcon />, label: "Leaderboard" },
    { route: "/ProfileScreen", icon: <ProfileIcon />, label: "Profile" },
  ];

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item, index) => {
        const isActive = pathname === item.route;
        return (
          <TouchableOpacity
            key={index}
            style={[item.isCenter ? styles.navItemCenter : styles.navItem, isActive && styles.navItemActive]}
            onPress={() => handleNavigation(item.route)}
            accessible={true}
            accessibilityLabel={item.label}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            {item.isCenter ? (
              <View style={styles.powerButton}>
                {item.icon}
              </View>
            ) : (
              item.icon
            )}
            {isActive && !item.isCenter && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxWidth: 431,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    zIndex: 1000,
  },
  navItem: {
    alignItems: "center",
  },
  navItemCenter: {
    alignItems: "center",
    position: "relative",
  },
  navItemActive: {
    alignItems: "center",
  },
  powerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0097B2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -35,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: "#1B59F8",
    marginTop: 8,
  },
});

export default BottomNav;