import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import BottomNav from "./BottomNav";

const Shop = () => {
  const router = useRouter();
  const [tokens, setTokens] = useState(3482);
  const [shopItems, setShopItems] = useState([
    { id: 1, name: 'Flipflop Drawing', price: 100, sent: false, type: 'drawing' },
    { id: 2, name: 'Morning Ringtone', price: 20, sent: false, type: 'ringtone' },
    { id: 3, name: 'Gentle Alarm', price: 130, sent: false, type: 'ringtone' },
    { id: 4, name: 'Flipflop Drawing 6', price: 100, sent: false, type: 'drawing' },
    { id: 5, name: 'Chime Ringtone', price: 20, sent: false, type: 'ringtone' },
    { id: 6, name: 'Wake-Up Alarm', price: 130, sent: false, type: 'ringtone' },
    { id: 7, name: 'Profile Frame', price: 150, sent: false, type: 'cosmetic' },
    { id: 8, name: 'Badge Glow', price: 200, sent: false, type: 'cosmetic' },
    { id: 9, name: 'Streak Saver (1 Day)', price: 50, sent: false, type: 'streak' },
    { id: 10, name: 'Streak Saver (3 Days)', price: 120, sent: false, type: 'streak' },
    { id: 11, name: 'Custom Avatar', price: 300, sent: false, type: 'cosmetic' },
    { id: 12, name: 'Token Booster', price: 250, sent: false, type: 'booster' },
  ]);

  const handlePurchase = (item) => {
    if (tokens >= item.price) {
      setTokens(tokens - item.price);
      setShopItems(shopItems.map(i =>
        i.id === item.id ? { ...i, sent: true } : i
      ));
      Alert.alert('Success', `You bought ${item.name}! ${item.type === 'drawing' ? 'Sent to friends.' : 'Added to your account.'}`, [{ text: 'OK' }]);
    } else {
      Alert.alert('Error', 'Not enough tokens!', [{ text: 'OK' }]);
    }
  };

  const AlarmIcon = () => (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#0097B2" />
    </Svg>
  );

  const DrawingIcon = () => (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#2E3A59" />
    </Svg>
  );

  const CosmeticIcon = () => (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11h2v6h-2zm0 8h2v2h-2z" fill="#EDB552" />
    </Svg>
  );

  const StreakIcon = () => (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L15 8H9L12 2zm0 20l-3-6h6l-3 6z" fill="#FFA600" />
      <Circle cx="12" cy="12" r="6" fill="none" stroke="#FFA600" strokeWidth="2" />
    </Svg>
  );

  const BoosterIcon = () => (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Path d="M12 2l3 6h-6l3-6zm0 20l-3-6h6l3 6zM8 9h8v6H8z" fill="#967CFD" />
    </Svg>
  );

  const getIcon = (type) => {
    switch (type) {
      case 'ringtone': return <AlarmIcon />;
      case 'drawing': return <DrawingIcon />;
      case 'cosmetic': return <CosmeticIcon />;
      case 'streak': return <StreakIcon />;
      case 'booster': return <BoosterIcon />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <Text style={styles.tokens}>Tokens: {tokens}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Spend your tokens on exclusive items!</Text>
        <ScrollView style={styles.shopContainer}>
          {shopItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.shopItem, item.sent && styles.sentItem]}
              onPress={() => handlePurchase(item)}
              disabled={item.sent}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                {getIcon(item.type)}
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} Tokens</Text>
              </View>
              <View style={[styles.buyButton, item.sent && styles.sentButton]}>
                <Text style={styles.buyButtonText}>{item.sent ? 'Owned' : 'Buy'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
  header: {
    paddingTop: 45,
    paddingHorizontal: 25,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8EDE3",
    letterSpacing: 0.5,
  },
  tokens: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F8EDE3",
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  content: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  subtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  shopContainer: {
    flex: 1,
  },
  shopItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 151, 178, 0.05)",
  },
  sentItem: {
    backgroundColor: "#E0E6ED",
    opacity: 0.8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(0, 151, 178, 0.1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "600",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: "#0097B2",
    fontWeight: "500",
  },
  buyButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#0097B2",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sentButton: {
    backgroundColor: "#95A5A6",
  },
  buyButtonText: {
    fontSize: 14,
    color: "#F8EDE3",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default Shop;