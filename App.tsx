import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  Animated,
  Easing,
} from 'react-native';

import { darkTheme, lightTheme, type ThemeTokens } from './src/theme';
import { posts, stories, conversations, notifications, suggestions, profileData } from './src/data/mockData';
import { GlassCard } from './src/components/GlassCard';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator();

export type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Create: undefined;
  Notifications: undefined;
  Profile: undefined;
};

type AppThemeMode = 'dark' | 'light';

type AppState = {
  themeMode: AppThemeMode;
  isLoggedIn: boolean;
  showSplash: boolean;
};

const initialTheme: ThemeTokens = darkTheme;

const appGradient = ['#060d18', '#0f172a', '#1d1b4b', '#100d2a'];

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const pulse = React.useRef(new Animated.Value(0.7)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.7,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    const timeout = setTimeout(() => {
      onFinish();
    }, 1800);

    return () => {
      animation.stop();
      clearTimeout(timeout);
    };
  }, [pulse, onFinish]);

  return (
    <View style={styles.splashContainer}>
      <LinearGradient colors={appGradient} style={StyleSheet.absoluteFillObject} />
      <Animated.View style={[styles.logoHalo, { transform: [{ scale: pulse }] }]} />
      <View style={styles.logoSymbolWrap}>
        <LinearGradient colors={['#3b82f6', '#8b5cf6', '#ec4899']} style={styles.logoSymbol}>
          <Text style={styles.logoSymbolText}>A</Text>
        </LinearGradient>
      </View>
      <Text style={styles.appName}>Anambra</Text>
      <Text style={styles.tagline}>Connect • Share • Belong</Text>
    </View>
  );
}

function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.authScreen}>
      <LinearGradient colors={['#08111d', '#111827', '#1d1b4b']} style={StyleSheet.absoluteFillObject} />
      <ScrollView contentContainerStyle={styles.authContent} showsVerticalScrollIndicator={false}>
        <View style={styles.authHeader}>
          <View style={styles.logoMarkSmall}>
            <Text style={styles.logoTextSmall}>A</Text>
          </View>
          <Text style={styles.authTitle}>Welcome to Anambra</Text>
          <Text style={styles.authSubtitle}>A premium social universe for creators, communities, and everyday stories.</Text>
        </View>

        <View style={styles.authTabs}>
          <Pressable onPress={() => setMode('login')} style={[styles.authTab, mode === 'login' && styles.authTabActive]}>
            <Text style={[styles.authTabText, mode === 'login' && styles.authTabTextActive]}>Login</Text>
          </Pressable>
          <Pressable onPress={() => setMode('signup')} style={[styles.authTab, mode === 'signup' && styles.authTabActive]}>
            <Text style={[styles.authTabText, mode === 'signup' && styles.authTabTextActive]}>Sign Up</Text>
          </Pressable>
        </View>

        <GlassCard style={styles.authCard}>
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          {mode === 'login' ? (
            <Pressable onPress={onLogin} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Continue</Text>
            </Pressable>
          ) : (
            <Pressable onPress={onLogin} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Create account</Text>
            </Pressable>
          )}

          <Pressable style={styles.ghostBtn}>
            <Text style={styles.ghostBtnText}>Forgot password?</Text>
          </Pressable>

          <View style={styles.separatorRow}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or continue with</Text>
            <View style={styles.separatorLine} />
          </View>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialBtn}>
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable style={styles.socialBtn}>
              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
          </View>

          <Pressable onPress={onLogin} style={styles.guestBtn}>
            <Text style={styles.guestText}>Continue as guest</Text>
          </Pressable>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={styles.feedScreen}>
      <ScrollView contentContainerStyle={styles.feedContent} showsVerticalScrollIndicator={false}>
        <View style={styles.navRow}>
          <View>
            <Text style={styles.kicker}>Good evening</Text>
            <Text style={styles.headerTitle}>Anambra</Text>
          </View>
          <View style={styles.navIcons}>
            <View style={styles.iconBadge}><Ionicons name="search-outline" size={18} color="#E2E8F0" /></View>
            <View style={styles.iconBadge}><Ionicons name="notifications-outline" size={18} color="#E2E8F0" /></View>
          </View>
        </View>

        <GlassCard style={styles.searchBar}>
          <Ionicons name="search-outline" size={16} color="#94a3b8" />
          <TextInput placeholder="Search creators, topics, places" placeholderTextColor="#94A3B8" style={styles.searchInput} />
        </GlassCard>

        <GlassCard style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>Community pulse</Text>
            <Text style={styles.livePill}>LIVE</Text>
          </View>
          <View style={styles.heroStatsRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>89K</Text>
              <Text style={styles.heroStatLabel}>followers</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>3.2K</Text>
              <Text style={styles.heroStatLabel}>posts</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>120</Text>
              <Text style={styles.heroStatLabel}>events</Text>
            </View>
          </View>
        </GlassCard>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Stories</Text>
        </View>
        <FlatList
          data={stories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storyRow}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.storyCell}>
              <View style={[styles.storyRing, { borderColor: item.color }]}>
                <View style={[styles.storyAvatar, { backgroundColor: item.color }]}>
                  <Text style={styles.storyInitial}>{item.name.charAt(0)}</Text>
                </View>
              </View>
              <Text style={styles.storyName}>{item.name}</Text>
            </View>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending</Text>
        </View>
        <View style={styles.tagRow}>
          {['#Anambra', '#Creators', '#Startup', '#NightLife'].map((tag) => (
            <View key={tag} style={styles.tagPill}><Text style={styles.tagText}>{tag}</Text></View>
          ))}
        </View>

        {posts.map((post) => (
          <GlassCard key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatarWrap}>
                <Text style={styles.avatarLetter}>{post.author.charAt(0)}</Text>
              </View>
              <View style={styles.postMeta}>
                <Text style={styles.authorName}>{post.author}</Text>
                <Text style={styles.authorTag}>{post.handle} • {post.time}</Text>
              </View>
              <Text style={styles.moreDots}>•••</Text>
            </View>

            <Text style={styles.postText}>{post.text}</Text>

            <Image source={{ uri: post.image }} style={styles.postImage} />

            <View style={styles.reactionRow}>
              <View style={styles.reactionItem}><Ionicons name="heart-outline" size={17} color="#E2E8F0" /><Text style={styles.reactionText}>{post.likes}</Text></View>
              <View style={styles.reactionItem}><Ionicons name="chatbox-ellipses-outline" size={17} color="#E2E8F0" /><Text style={styles.reactionText}>{post.comments}</Text></View>
              <View style={styles.reactionItem}><Ionicons name="repeat-outline" size={17} color="#E2E8F0" /><Text style={styles.reactionText}>{post.shares}</Text></View>
            </View>
          </GlassCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function ExploreScreen() {
  return (
    <SafeAreaView style={styles.feedScreen}>
      <ScrollView contentContainerStyle={styles.feedContent}>
        <Text style={styles.headerTitle}>Explore</Text>
        <GlassCard style={styles.searchBar}>
          <Ionicons name="search-outline" size={16} color="#94a3b8" />
          <TextInput placeholder="Search people, places, interests" placeholderTextColor="#94A3B8" style={styles.searchInput} />
        </GlassCard>

        <Text style={styles.sectionTitle}>Discovery</Text>
        <View style={styles.discoveryGrid}>
          {suggestions.map((item) => (
            <GlassCard key={item.id} style={styles.discoveryItem}>
              <Text style={styles.discoveryTag}>{item.category}</Text>
              <Text style={styles.discoveryTitle}>{item.title}</Text>
              <Text style={styles.discoverySubtitle}>{item.subtitle}</Text>
            </GlassCard>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Suggested creators</Text>
        <View style={styles.userList}>
          {['Aisha', 'Davis', 'Nneka', 'Tolu'].map((name, idx) => (
            <GlassCard key={name} style={styles.userRow}>
              <View style={[styles.storyAvatar, { backgroundColor: ['#8B5CF6', '#22D3EE', '#F472B6', '#34D399'][idx] }]}>
                <Text style={styles.storyInitial}>{name.charAt(0)}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.authorName}>{name}</Text>
                <Text style={styles.authorTag}>@{name.toLowerCase()}</Text>
              </View>
              <Pressable style={styles.followBtn}><Text style={styles.followText}>Follow</Text></Pressable>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CreatePostScreen() {
  return (
    <SafeAreaView style={styles.feedScreen}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Create</Text>
        <Pressable style={styles.postAction}><Text style={styles.postActionText}>Draft</Text></Pressable>
      </View>

      <GlassCard style={styles.composeCard}>
        <Text style={styles.composeLabel}>Share a thought</Text>
        <TextInput
          multiline
          placeholder="What is happening today?"
          placeholderTextColor="#94A3B8"
          style={styles.composeInput}
        />

        <View style={styles.tagRow}>
          {['Photo', 'Video', 'GIF', 'Poll'].map((item) => (
            <Text key={item} style={styles.tagPillSecondary}>{item}</Text>
          ))}
        </View>

        <View style={styles.metaPanel}>
          <Text style={styles.metaText}>Audience</Text>
          <Text style={styles.metaValue}>Public</Text>
        </View>

        <Pressable style={styles.primaryBtnLarge}>
          <Text style={styles.primaryBtnText}>Publish post</Text>
        </Pressable>
      </GlassCard>
    </SafeAreaView>
  );
}

function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.feedScreen}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Ionicons name="settings-outline" size={20} color="#E2E8F0" />
      </View>

      <View style={styles.notificationList}>
        {notifications.map((item) => (
          <GlassCard key={item.id} style={styles.notificationItem}>
            <View style={[styles.storyAvatar, { backgroundColor: item.color }]}>
              <Text style={styles.storyInitial}>{item.label}</Text>
            </View>
            <View style={styles.notificationMeta}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationText}>{item.message}</Text>
            </View>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </GlassCard>
        ))}
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.feedScreen}>
      <ScrollView contentContainerStyle={styles.feedContent}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Ionicons name="create-outline" size={22} color="#E2E8F0" />
        </View>

        <GlassCard style={styles.profilePanel}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80' }} style={styles.coverImage} />
          <View style={styles.profileHeaderRow}>
            <View style={styles.profileAvatarLarge}>
              <Text style={styles.profileAvatarText}>{profileData.name.charAt(0)}</Text>
            </View>
            <Pressable style={styles.followBtn}><Text style={styles.followText}>Edit profile</Text></Pressable>
          </View>

          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.authorTag}>@{profileData.handle}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>

          <View style={styles.profileStatsRow}>
            <View style={styles.profileStat}><Text style={styles.profileValue}>{profileData.followers}</Text><Text style={styles.profileLabel}>Followers</Text></View>
            <View style={styles.profileStat}><Text style={styles.profileValue}>{profileData.following}</Text><Text style={styles.profileLabel}>Following</Text></View>
            <View style={styles.profileStat}><Text style={styles.profileValue}>{profileData.posts}</Text><Text style={styles.profileLabel}>Posts</Text></View>
          </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>Highlights</Text>
        <View style={styles.highlightRow}> 
          {['Travel', 'Design', 'Community', 'Launch'].map((item, i) => (
            <View key={item} style={[styles.highlightBubble, { backgroundColor: ['#8B5CF6', '#22D3EE', '#F472B6', '#F59E0B'][i] }]}>
              <Text style={styles.highlightText}>{item.substring(0, 1)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.feedScreen}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.settingList}>
        {[
          'Account',
          'Privacy & Security',
          'Notifications',
          'Appearance',
          'Storage',
          'Help & Support',
          'About'
        ].map((item, idx) => (
          <GlassCard key={item} style={styles.settingItem}>
            <Text style={styles.settingText}>{item}</Text>
            <Text style={styles.settingArrow}>{idx % 2 === 0 ? '›' : '›'}</Text>
          </GlassCard>
        ))}
      </View>
    </SafeAreaView>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(9, 15, 23, 0.9)',
          borderTopColor: 'rgba(148,163,184,0.18)',
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#C4B5FD',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'home-outline';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'Explore') iconName = focused ? 'compass' : 'compass-outline';
          if (route.name === 'Create') iconName = focused ? 'add-circle' : 'add-circle-outline';
          if (route.name === 'Notifications') iconName = focused ? 'notifications' : 'notifications-outline';
          if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [themeMode, setThemeMode] = useState<AppThemeMode>('dark');
  const [appState, setAppState] = useState<AppState>({
    themeMode: 'dark',
    isLoggedIn: false,
    showSplash: true,
  });

  const theme = useMemo(() => (themeMode === 'dark' ? darkTheme : lightTheme), [themeMode]);

  const handleLogin = () => setAppState((prev) => ({ ...prev, isLoggedIn: true }));
  const handleSplashComplete = () => setAppState((prev) => ({ ...prev, showSplash: false }));

  if (appState.showSplash) {
    return (
      <>
        <StatusBar style="light" />
        <SplashScreen onFinish={handleSplashComplete} />
      </>
    );
  }

  if (!appState.isLoggedIn) {
    return (
      <>
        <StatusBar style="light" />
        <AuthScreen onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoHalo: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    position: 'absolute',
  },
  logoSymbolWrap: {
    width: 120,
    height: 120,
    borderRadius: 36,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  logoSymbol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSymbolText: {
    color: '#fff',
    fontSize: 52,
    fontWeight: '800',
  },
  appName: {
    marginTop: 24,
    color: '#f8fafc',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  tagline: {
    color: '#cbd5e1',
    fontSize: 16,
    marginTop: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  authScreen: {
    flex: 1,
    backgroundColor: '#09111b',
  },
  authContent: {
    paddingHorizontal: 22,
    paddingTop: 32,
    paddingBottom: 48,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoMarkSmall: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoTextSmall: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 30,
  },
  authTitle: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  authSubtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  authTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderRadius: 18,
    padding: 6,
    marginBottom: 18,
  },
  authTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
  },
  authTabActive: {
    backgroundColor: '#8b5cf6',
  },
  authTabText: {
    color: '#cbd5e1',
    fontWeight: '700',
  },
  authTabTextActive: {
    color: '#fff',
  },
  authCard: {
    padding: 18,
  },
  input: {
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.18)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#f8fafc',
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 6,
  },
  primaryBtnLarge: {
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 18,
    marginTop: 18,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  ghostBtn: {
    marginTop: 12,
    alignItems: 'center',
  },
  ghostBtnText: {
    color: '#c4b5fd',
    fontWeight: '600',
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 18,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(148,163,184,0.2)',
  },
  separatorText: {
    marginHorizontal: 12,
    color: '#94a3b8',
    fontSize: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  socialBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(15,23,42,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.18)',
    alignItems: 'center',
  },
  socialText: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  guestBtn: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
  },
  guestText: {
    color: '#e2e8f0',
    fontWeight: '700',
  },
  feedScreen: {
    flex: 1,
    backgroundColor: '#07111d',
  },
  feedContent: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 10,
  },
  kicker: {
    color: '#94a3b8',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 26,
    fontWeight: '800',
  },
  navIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: 'rgba(148,163,184,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 14,
  },
  heroCard: {
    padding: 18,
    marginBottom: 16,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 16,
  },
  livePill: {
    color: '#c4b5fd',
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(139,92,246,0.14)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
  },
  heroStatsRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  heroStat: {
    flex: 1,
    backgroundColor: 'rgba(30,41,59,0.7)',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  heroStatValue: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 18,
  },
  heroStatLabel: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 4,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
  },
  storyRow: {
    paddingVertical: 6,
    gap: 16,
  },
  storyCell: {
    alignItems: 'center',
    marginRight: 14,
  },
  storyRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(9, 15, 23, 0.7)',
  },
  storyAvatar: {
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
    color: '#cbd5e1',
    fontSize: 11,
    marginTop: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  tagPill: {
    backgroundColor: 'rgba(148,163,184,0.12)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.18)',
  },
  tagPillSecondary: {
    backgroundColor: 'rgba(139,92,246,0.12)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(196,181,253,0.2)',
    color: '#ddd6fe',
    fontSize: 12,
    fontWeight: '600',
  },
  tagText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  postCard: {
    padding: 16,
    marginTop: 18,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarLetter: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  postMeta: {
    flex: 1,
  },
  authorName: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 15,
  },
  authorTag: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  moreDots: {
    color: '#cbd5e1',
    fontWeight: '800',
  },
  postText: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 14,
    marginBottom: 12,
  },
  postImage: {
    height: 220,
    borderRadius: 18,
    marginBottom: 12,
  },
  reactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reactionText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '700',
  },
  discoveryGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  discoveryItem: {
    width: '48%',
    padding: 16,
  },
  discoveryTag: {
    color: '#c4b5fd',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  discoveryTitle: {
    marginTop: 10,
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
  },
  discoverySubtitle: {
    color: '#94a3b8',
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
  },
  userList: {
    marginTop: 12,
    gap: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  followBtn: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  followText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },
  postAction: {
    backgroundColor: 'rgba(148,163,184,0.12)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postActionText: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  composeCard: {
    marginHorizontal: 18,
    marginTop: 12,
    padding: 18,
  },
  composeLabel: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 12,
  },
  composeInput: {
    minHeight: 160,
    backgroundColor: 'rgba(15,23,42,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.18)',
    borderRadius: 16,
    padding: 14,
    color: '#f8fafc',
    fontSize: 15,
    textAlignVertical: 'top',
  },
  metaPanel: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.18)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  metaText: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  metaValue: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  notificationList: {
    paddingHorizontal: 18,
    gap: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  notificationMeta: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 14,
  },
  notificationText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  notificationTime: {
    color: '#cbd5e1',
    fontSize: 11,
    marginLeft: 8,
  },
  profilePanel: {
    overflow: 'hidden',
    paddingBottom: 18,
  },
  coverImage: {
    width: '100%',
    height: 140,
  },
  profileHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: -28,
  },
  profileAvatarLarge: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 4,
    borderColor: '#07111d',
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 30,
  },
  profileName: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 24,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  bio: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  profileStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingHorizontal: 16,
  },
  profileStat: {
    flex: 1,
    backgroundColor: 'rgba(30,41,59,0.8)',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  profileValue: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 16,
  },
  profileLabel: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 4,
  },
  highlightRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  highlightBubble: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  settingList: {
    paddingHorizontal: 18,
    gap: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingText: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 15,
  },
  settingArrow: {
    color: '#94a3b8',
    fontSize: 18,
  },
});
