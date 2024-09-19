import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const tasks = {
  'Flora Identification': {
    description: 'Identify different types of plants and trees as you explore the trail.',
    imageUrl: require('./assets/flora-identification.jpeg'),
    points: 100,
    badge: 'Nature Expert',
  },
  'Fauna Trivia': {
    description: 'Answer wildlife trivia questions as you spot different animals.',
    imageUrl: require('./assets/fauna-identification.jpeg'),
    points: 150,
    badge: 'Wildlife Whiz',
  },
  'Landscape Photographer': {
    description: 'Capture the breathtaking beauty of Borneo’s landscapes. Share your best shots and get featured!',
    imageUrl: require('./assets/landscape.jpg'),
    points: 200,
    badge: 'Vista Master',
  },
};

const ListItem = ({ title, description, imageUrl, onPress, progress, points, badge }) => {
  const [bounceAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));

  const triggerAnimations = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.spring(bounceAnim, { toValue: 1.1, friction: 1, useNativeDriver: true }),
        Animated.spring(bounceAnim, { toValue: 1, friction: 1, useNativeDriver: true })
      ]),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={[styles.listItem, { transform: [{ scale: bounceAnim }] }]}>
      <Image source={imageUrl} style={styles.listImage} />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
        style={styles.imageOverlay}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Text style={styles.pointsBadge}>{points} pts</Text>
        </Animated.View>
        <Text style={styles.badgeText}>{badge}</Text>
      </LinearGradient>
      <View style={styles.listContent}>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listDescription}>{description}</Text>
        
        <ProgressBar 
          progress={progress} 
          color={'#34A853'} 
          style={styles.progressBar}
          animated={true}
        />
        <Text style={styles.progressText}>Progress: {Math.round(progress * 100)}%</Text>
        
        <Text style={styles.timerText}>Time Left: 30 mins</Text>   
        
        <TouchableOpacity onPress={() => { onPress(); triggerAnimations(); }} style={styles.gradientButton}>
          <Text style={styles.gradientButtonText}>Start Adventure</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const TrailHunt = () => {
  const navigation = useNavigation();
  const [allChallenges, setallChallenges] = useState('');

  useEffect(() => {
    const challenge = 'Collect 400 points to win a prize!';
    setallChallenges(challenge);
  }, []);

  const handleGameSelection = (gameKey) => {
    navigation.navigate('TriviaQues', { gameKey });
  };

  const featureData = Object.keys(tasks).map((key) => ({
    title: key,
    description: tasks[key].description,
    imageUrl: tasks[key].imageUrl,
    navigateTo: key,
    points: tasks[key].points,
    badge: tasks[key].badge,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Trail Adventure</Text>
      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>All Challenges</Text>
        <Text style={styles.leaderboardText}>{allChallenges}</Text>
      </View>
      <FlatList
        data={featureData}
        renderItem={({ item }) => (
          <ListItem 
            {...item} 
            onPress={() => handleGameSelection(item.navigateTo)}
            progress={Math.random()} // Simulated progress
          />
        )}
        keyExtractor={(item) => item.title}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 5,
    textAlign: 'Left',
  },
  leaderboardContainer: {
    backgroundColor: '#68a168',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  leaderboardTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  leaderboardText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  listContainer: {
    paddingBottom: 80,
  },
  listItem: {
    width: Dimensions.get('window').width * 0.85,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  listImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 15,
  },
  pointsBadge: {
    backgroundColor: '#F9A825',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 5,
  },
  badgeText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  listContent: {
    padding: 20,
  },
  listTitle: {
    fontSize: 22,
    color: 'rgb(0, 77, 64)',
    fontFamily: 'Poppins-Bold',
    paddingBottom: 10,
  },
  listDescription: {
    fontSize: 14,
    color: '#636e72',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    lineHeight: 22,
  },
  progressBar: {
    height: 8,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  progressText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
    paddingTop: 8,
  },
  timerText: {
    fontSize: 16,
    color: '#d63031',
    fontWeight: '600',
    marginBottom: 12,
  },
  gradientButton: {
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 77, 64, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  gradientButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});

export default TrailHunt;