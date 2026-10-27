import React from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const stories = [
  { id: 's1', name: 'You', color: '#8b5cf6', active: true },
  { id: 's2', name: 'Ada', color: '#f472b6' },
  { id: 's3', name: 'Tobi', color: '#22d3ee' },
  { id: 's4', name: 'Mia', color: '#fbbf24' },
  { id: 's5', name: 'Ike', color: '#34d399' },
  { id: 's6', name: 'Nora', color: '#f97316' },
];

const trending = ['#Anambra', '#Creator', '#Startup', '#NightLife', '#Community'];

const posts = [
  {
    id: 'p1',
    author: 'Ada Okafor',
    handle: '@ada_works',
    time: '2h ago',
    text: 'Sunset in Onitsha is always a reminder that good things can still feel peaceful. Building something meaningful for creators in Anambra.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    likes: 1240,
    comments: 86,
    shares: 31,
    accent: '#8b5cf6',
  },
  {
    id: 'p2',
    author: 'Kingsley Duru',
    handle: '@kingsley',
    time: '4h ago',
    text: 'Anambra creators are here. We are building with community, talent, and local stories at the center.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    likes: 980,
    comments: 54,
    shares: 22,
    accent: '#22d3ee',
  },
];

const messages = [
  { id: 'm1', name: 'Chika', preview: 'Can we do the live session by 7?', time: '10:24', unread: 3 },
  { id: 'm2', name: 'Bolu', preview: 'Your edits are ready for review.', time: '09:12', unread: 1 },
  { id: 'm3', name: 'Mina', preview: 'The launch post looks amazing.', time: 'Yesterday', unread: 0 },
  { id: 'm4', name: 'Ayo', preview: 'I sent the file to the group.', time: 'Mon', unread: 0 },
];

const calls = [
  { id: 'c1', name: 'Chika', type: 'Video call', time: 'Today, 6:30 PM', status: 'Incoming' },
  { id: 'c2', name: 'Mina', type: 'Voice call', time: 'Today, 5:00 PM', status: 'Missed' },
  { id: 'c3', name: 'Ayo', type: 'Video call', time: 'Yesterday, 8:40 PM', status: 'Completed' },
];

function StoryBubble({ item }) {
  return (
    <View style={styles.storyWrap}>
      <View style={[styles.storyRing, item.active && styles.storyActiveRing, { borderColor: item.color }]}>
        <View style={[styles.storyCircle, { backgroundColor: item.color }]}>
          <Text style={styles.storyInitial}>{item.name.charAt(0)}</Text>
        </View>
      </View>
      <Text style={styles.storyName}>{item.name}</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.eyebrow}>Good evening</Text>
            <Text style={styles.brand}>Anambra</Text>
          </View>

          <View style={styles.actionButtons}>
            <View style={styles.iconButton}>
              <Ionicons name="search-outline" size={18} color="#e2e8f0" />
            </View>
            <View style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={18} color="#e2e8f0" />
            </View>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={16} color="#94a3b8" />
          <TextInput
            placeholder="Search creators, topics, trends"
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Community Pulse</Text>
            <Text style={styles.statsTag}>Live</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>89K</Text>
              <Text style={styles.statLabel}>followers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3.2K</Text>
              <Text style={styles.statLabel}>posts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>events</Text>
            </View>
          </View>
        </View>

        <View style={styles.storySection}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={stories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <StoryBubble item={item} />}
          />
        </View>

        <View style={styles.trendingWrap}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <View style={styles.chipRow}>
            {trending.map((tag) => (
              <View key={tag} style={styles.chip}>
                <Text style={styles.chipText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {posts.map((item) => (
          <View key={item.id} style={styles.feedCard}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.author.charAt(0)}</Text>
              </View>
              <View style={styles.metaWrap}>
                <Text style={styles.authorName}>{item.author}</Text>
                <Text style={styles.handleText}>{item.handle} • {item.time}</Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={18} color="#cbd5e1" />
            </View>

            <Text style={styles.postText}>{item.text}</Text>

            <Image source={{ uri: item.image }} style={styles.postImage} />

            <View style={styles.cardFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="heart-outline" size={18} color="#f1f5f9" />
                <Text style={styles.footerText}>{item.likes}</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="chatbox-ellipses-outline" size={18} color="#f1f5f9" />
                <Text style={styles.footerText}>{item.comments}</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="repeat-outline" size={18} color="#f1f5f9" />
                <Text style={styles.footerText}>{item.shares}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function MessagesScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerPanel}>
        <Text style={styles.panelTitle}>Messages</Text>
        <Ionicons name="create-outline" size={22} color="#e2e8f0" />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
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
      <View style={styles.headerPanel}>
        <Text style={styles.panelTitle}>Create</Text>
      </View>

      <View style={styles.composeCard}>
        <Text style={styles.composeLabel}>Share a thought</Text>
        <TextInput
          multiline
          placeholder="What's happening today?"
          placeholderTextColor="#94a3b8"
          style={styles.composeInput}
        />

        <View style={styles.composeActions}>
          <Text style={styles.actionPill}>📷 Photo</Text>
          <Text style={styles.actionPill}>🎥 Reel</Text>
          <Text style={styles.actionPill}>📍 Location</Text>
        </View>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Post now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function CallsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerPanel}>
        <Text style={styles.panelTitle}>Calls</Text>
        <Ionicons name="videocam-outline" size={22} color="#e2e8f0" />
      </View>

      <FlatList
        data={calls}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
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
      <View style={styles.headerPanel}>
        <Text style={styles.panelTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>A</Text>
        </View>

        <Text style={styles.profileName}>Ada Okafor</Text>
        <Text style={styles.profileHandle}>@ada_works</Text>

        <View style={styles.statsRow}>
          <View style={styles.statMiniBox}>
            <Text style={styles.statTextValue}>8.4K</Text>
            <Text style={styles.statTextLabel}>Followers</Text>
          </View>
          <View style={styles.statMiniBox}>
            <Text style={styles.statTextValue}>1.2K</Text>
            <Text style={styles.statTextLabel}>Following</Text>
          </View>
          <View style={styles.statMiniBox}>
            <Text style={styles.statTextValue}>240</Text>
            <Text style={styles.statTextLabel}>Posts</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function AppNavigator() {
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
          tabBarActiveTintColor: '#c4b5fd',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: {
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            borderTopWidth: 0,
            height: 72,
            paddingBottom: 12,
            paddingTop: 10,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
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
    backgroundColor: '#07111d',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingBottom: 12,
  },
  eyebrow: {
    color: '#94a3b8',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  brand: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 28,
    letterSpacing: -0.7,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 14,
  },
  statsCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(196, 181, 253, 0.25)',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  statsTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 16,
  },
  statsTag: {
    color: '#c4b5fd',
    backgroundColor: 'rgba(139, 92, 246, 0.18)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontWeight: '700',
    fontSize: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statNumber: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  storySection: {
    marginTop: 18,
    paddingVertical: 6,
  },
  storyWrap: {
    alignItems: 'center',
    marginRight: 18,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
  storyActiveRing: {
    shadowColor: '#c4b5fd',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  storyCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyInitial: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
  },
  storyName: {
    fontSize: 11,
    color: '#cbd5e1',
    marginTop: 8,
  },
  trendingWrap: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: 'rgba(148,163,184,0.12)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '600',
  },
  feedCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    padding: 16,
    marginTop: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  metaWrap: {
    flex: 1,
  },
  authorName: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '700',
  },
  handleText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  postText: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '600',
  },
  headerPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 12,
  },
  panelTitle: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 26,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.1)',
    marginBottom: 12,
  },
  chatAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#c084fc',
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
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 15,
  },
  chatTime: {
    color: '#94a3b8',
    fontSize: 11,
  },
  chatPreview: {
    marginTop: 4,
    color: '#94a3b8',
    fontSize: 13,
  },
  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  unreadText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  composeCard: {
    margin: 18,
    padding: 18,
    borderRadius: 28,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(196, 181, 253, 0.18)',
  },
  composeLabel: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 12,
  },
  composeInput: {
    minHeight: 130,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.18)',
    padding: 14,
    color: '#f8fafc',
    fontSize: 15,
    textAlignVertical: 'top',
  },
  composeActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
    marginBottom: 18,
  },
  actionPill: {
    backgroundColor: 'rgba(139,92,246,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(196, 181, 253, 0.25)',
    borderRadius: 999,
    color: '#ddd6fe',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#8b5cf6',
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.1)',
    marginBottom: 12,
  },
  callMeta: {
    flex: 1,
  },
  callStatus: {
    color: '#34d399',
    fontWeight: '700',
    fontSize: 11,
  },
  missed: {
    color: '#f87171',
  },
  profileCard: {
    margin: 18,
    padding: 20,
    borderRadius: 28,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(196,181,253,0.18)',
  },
  profileAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  profileAvatarText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 36,
  },
  profileName: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
  },
  profileHandle: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
    gap: 10,
  },
  statMiniBox: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  statTextValue: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '800',
  },
  statTextLabel: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 4,
  },
});

export default AppNavigator;
