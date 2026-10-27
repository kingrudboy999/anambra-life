import { supabase } from '../lib/supabase';
import { notifications as mockNotifications } from '../data/mockData';

export type AppProfile = {
  id: string;
  created_at?: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  color?: string;
  label?: string;
};

export type SocialPost = {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  likes: number;
  comments: number;
  liked_by_me: boolean;
  profiles?: AppProfile | null;
};

const slugifyUsername = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 24) || 'anambra_user';

async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error('You must be signed in to continue.');
  return user;
}

export async function ensureProfileForCurrentUser(): Promise<AppProfile | null> {
  const user = await getCurrentUser();
  const emailBase = (user.email ?? 'anambra-user').split('@')[0] || 'anambra-user';
  const defaultUsername = slugifyUsername(`${emailBase}-${user.id.slice(0, 6)}`);

  const { data: existing, error: selectError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (selectError && selectError.code !== 'PGRST116') {
    throw selectError;
  }

  if (existing) {
    return existing as AppProfile;
  }

  const insertPayload = {
    id: user.id,
    full_name: user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Anambra User',
    username: defaultUsername,
    avatar_url: user.user_metadata?.avatar_url ?? null,
    bio: 'Creating with community, storytelling, and clarity.',
  };

  const { data, error } = await supabase.from('profiles').insert(insertPayload).select().single();
  if (error) throw error;
  return data as AppProfile;
}

export async function updateProfile(input: {
  full_name: string;
  username: string;
  bio: string;
  avatar_url?: string | null;
}) {
  const user = await getCurrentUser();
  const cleanUsername = slugifyUsername(input.username);

  const { data, error } = await supabase
    .from('profiles')
    .update({
      full_name: input.full_name,
      username: cleanUsername,
      bio: input.bio,
      avatar_url: input.avatar_url ?? null,
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data as AppProfile;
}

export async function fetchPosts(): Promise<SocialPost[]> {
  const user = await getCurrentUser();

  const { data: postRows, error: postError } = await supabase
    .from('posts')
    .select('id, user_id, content, image_url, created_at, profiles:profiles!user_id(id, full_name, username, avatar_url, bio)')
    .order('created_at', { ascending: false });

  if (postError) throw postError;

  const ids = (postRows ?? []).map((post: any) => post.id);

  let likeRows: any[] = [];
  let commentRows: any[] = [];

  if (ids.length) {
    const [likesResult, commentsResult] = await Promise.all([
      supabase.from('likes').select('post_id, user_id').in('post_id', ids),
      supabase.from('comments').select('post_id').in('post_id', ids),
    ]);

    if (likesResult.error) throw likesResult.error;
    if (commentsResult.error) throw commentsResult.error;

    likeRows = likesResult.data ?? [];
    commentRows = commentsResult.data ?? [];
  }

  const likeCounts = likeRows.reduce((total, row: any) => {
    total[row.post_id] = (total[row.post_id] ?? 0) + 1;
    return total;
  }, {} as Record<string, number>);

  const commentCounts = commentRows.reduce((total, row: any) => {
    total[row.post_id] = (total[row.post_id] ?? 0) + 1;
    return total;
  }, {} as Record<string, number>);

  const likedPostIds = new Set(
    likeRows.filter((row: any) => row.user_id === user.id).map((row: any) => row.post_id)
  );

  return (postRows ?? []).map((post: any) => ({
    id: post.id,
    user_id: post.user_id,
    content: post.content,
    image_url: post.image_url,
    created_at: post.created_at,
    likes: likeCounts[post.id] ?? 0,
    comments: commentCounts[post.id] ?? 0,
    liked_by_me: likedPostIds.has(post.id),
    profiles: post.profiles ?? null,
  }));
}

export async function createPost(payload: { content: string; imageUrl?: string | null }) {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: user.id,
      content: payload.content,
      image_url: payload.imageUrl ?? null,
    })
    .select('id, user_id, content, image_url, created_at')
    .single();

  if (error) throw error;

  const { data: profileRow } = await supabase
    .from('profiles')
    .select('id, full_name, username, avatar_url, bio')
    .eq('id', user.id)
    .maybeSingle();

  return {
    id: data.id,
    user_id: data.user_id,
    content: data.content,
    image_url: data.image_url,
    created_at: data.created_at,
    likes: 0,
    comments: 0,
    liked_by_me: false,
    profiles: profileRow ?? null,
  } as SocialPost;
}

export async function toggleLike(postId: string): Promise<SocialPost[]> {
  const user = await getCurrentUser();

  const { data: existingRow, error: checkError } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError;
  }

  if (existingRow) {
    const { error } = await supabase.from('likes').delete().eq('id', existingRow.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
    if (error) throw error;
  }

  return fetchPosts();
}

export async function fetchNotifications(): Promise<NotificationItem[]> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12);

    if (error) {
      throw error;
    }

    if (data && data.length) {
      return (data as any[]).map((item) => ({
        id: item.id,
        title: item.title,
        message: item.message,
        time: item.time ?? 'now',
        color: item.color ?? '#8B5CF6',
        label: item.label ?? 'A',
      }));
    }
  } catch {
    // fallback to static demo feed if the notifications table is not present yet
  }

  return mockNotifications as NotificationItem[];
}
