import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';

const Tab = createBottomTabNavigator();

const stories = [
  { id: '1', name: 'You', color: '#8b5cf6' },
  { id: '2', name: 'Chika', color: '#ec4899' },
  { id: '3', name: 'Ayo', color: '#f59e0b' },
  { id: '4', name: 'Mina', color: '#10b981' },
  { id: '5', name: 'Nnam', color: '#38bdf8' },
  { id: '6', name: 'Grace', color: '#f97316' },
];

const posts = [
  {
    id: 'p1',
    author: 'Ada Okafor',
    handle: '@ada_works',
    time: '2h ago',
    text: 'Sunset in Onitsha is always a reminder that good things can still feel peaceful. What are you building today?',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    likes: 1240,
    comments: 86,
    shares: 31,
  },
  {
    id: 'p2',
    author: 'Kingsley Duru',
    handle: '@kingsley',
    time: '4h ago',
    text: 'Just wrapped a livestream for our local business community. Excited to keep supporting creators in Anambra.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    likes: 980,
    comments: 54,
    shares: 22,
  },
];

const messages = [
  { id: 'm1', name: 'Chika', preview: 'Can we meet later for the project?', time: '10:24', unread: 3 },
  { id: 'm2', name: 'Bolu', preview: 'Your video call is ready.', time: '09:12', unread: 1 },
  { id: 'm3', name: 'Mina', preview: 'The new post looks amazing!', time: 'Yesterday', unread: 0 },
  { id: 'm4', name: 'Ayo', preview: 'I sent the draft for review.', time: 'Mon', unread: 0 },
];

const calls = [
  { id: 'c1', name: 'Chika', type: 'Video call', time: 'Today, 6:30 PM', status: 'Incoming' },
  { id: 'c2', name: 'Mina', type: 'Voice call', time: 'Today, 5:00 PM', status: 'Missed' },
  { id: 'c3', name: 'Ayo', type: 'Video call', time: 'Yesterday, 8:40 PM', status: 'Completed' },
];

function StoryBubble({ item }) {
  return (
    <View style={styles.storyWrap}>
      <View style={[styles.storyCircle, { backgroundColor: item.color }]}>
        <Text style={styles.storyInitial}>{item.name.charAt(0)}</Text>
      </View>
      <Text style={styles.storyName}>{item.name}</Text>
    </View>
  );
}

function FeedCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.author.charAt(0)}</Text>
        </View>
        <View style={styles.userMeta}>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.handleText}>{item.handle} • {item.time}</Text>
        </View>
      </View>

      <Text style={styles.postText}>{item.text}</Text>

      <Image source={{ uri: item.image }} style={styles.postImage} />

      <View style={styles.actionRow}>
        <Text style={styles.actionText}>❤ {item.likes}</Text>
        <Text style={styles.actionText}>💬 {item.comments}</Text>
        <Text style={styles.actionText}>↻ {item.shares}</Text>
      </View>
    </View>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>Anambra Life</Text>
        <Ionicons name="notifications-outline" size={24} color="#1f2937" />
      </View>

      <View style={styles.storyContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StoryBubble item={item} />}
        />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedCard item={item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

function MessagesScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>Messages</Text>
        <Ionicons name="create-outline" size={24} color="#1f2937" />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <View style={styles.chatAvatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.chatMeta}>
              <View style={styles.chatRow}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <Text style={styles.chatPreview}>{item.preview}</Text>
            </View>
            {item.unread > 0 ? (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            ) : null}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function CreateScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>Create</Text>
      </View>

      <View style={styles.composeCard}>
        <Text style={styles.label}>Share an update</Text>
        <TextInput
          multiline
          placeholder="What is happening today?"
          placeholderTextColor="#9ca3af"
          style={styles.textInput}
        />

        <View style={styles.composeActions}>
          <Text style={styles.actionPill}>📷 Photo</Text>
          <Text style={styles.actionPill}>🎥 Video</Text>
          <Text style={styles.actionPill}>📍 Check-in</Text>
        </View>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Post</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function CallsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>Calls</Text>
        <Ionicons name="videocam-outline" size={24} color="#1f2937" />
      </View>

      <FlatList
        data={calls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.callItem}>
            <View style={styles.chatAvatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.callMeta}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatPreview}>{item.type} • {item.time}</Text>
            </View>
            <Text style={[styles.callStatus, item.status === 'Missed' ? styles.missed : null]}>{item.status}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>A</Text>
        </View>

        <Text style={styles.profileName}>Ada Okafor</Text>
        <Text style={styles.profileHandle}>@ada_works</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8.4K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>240</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Messages') iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            else if (route.name === 'Create') iconName = focused ? 'add-circle' : 'add-circle-outline';
            else if (route.name === 'Calls') iconName = focused ? 'call' : 'call-outline';
            else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: '#7c3aed',
          tabBarInactiveTintColor: '#64748b',
          tabBarStyle: {
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Create" component={CreateScreen} />
        <Tab.Screen name="Calls" component={CallsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  storyContainer: {
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eef2ff',
  },
  storyWrap: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  storyCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  storyInitial: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  storyName: {
    fontSize: 11,
    color: '#374151',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#a78bfa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  userMeta: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  handleText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  postText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1f2937',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  actionText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 16,
    padding: 12,
  },
  chatAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#c4b5fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  chatMeta: {
    flex: 1,
  },
  chatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  chatTime: {
    fontSize: 11,
    color: '#6b7280',
  },
  chatPreview: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
  },
  unreadBadge: {
    minWidth: 22,
    height: 22,
    backgroundColor: '#7c3aed',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  composeCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  textInput: {
    minHeight: 120,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#1f2937',
  },
  composeActions: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 18,
    gap: 10,
    flexWrap: 'wrap',
  },
  actionPill: {
    backgroundColor: '#f3e8ff',
    color: '#6d28d9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: '600',
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 16,
    padding: 12,
  },
  callMeta: {
    flex: 1,
  },
  callStatus: {
    fontWeight: '700',
    fontSize: 11,
    color: '#10b981',
  },
  missed: {
    color: '#ef4444',
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  profileAvatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  profileHandle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
  },
});

export default App;
