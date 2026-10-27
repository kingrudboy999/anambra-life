import React from 'react';
import { View, ViewStyle } from 'react-native';

export function GlassCard({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      borderWidth: 1,
      borderColor: 'rgba(148,163,184,0.16)',
      borderRadius: 22,
      shadowColor: '#0f172a',
      shadowOpacity: 0.25,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 8 },
    }, style]}>
      {children}
    </View>
  );
}
