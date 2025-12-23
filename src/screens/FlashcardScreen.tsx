import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
  Vibration,
} from 'react-native';
import { Flashcard, StudyMode, QuizScore } from '../types';
import { flashcardData } from '../data/flashcards';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FlashcardScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode>('study');
  const [filterSection, setFilterSection] = useState<string>('All');
  const [cards, setCards] = useState<Flashcard[]>(flashcardData);
  const [quizScore, setQuizScore] = useState<QuizScore>({
    correct: 0,
    incorrect: 0,
    total: 0,
  });
  const [flipAnimation] = useState(new Animated.Value(0));
  const [scaleAnimation] = useState(new Animated.Value(1));

  const currentCard = cards[currentIndex];
  const sections = ['All', ...Array.from(new Set(flashcardData.map(c => c.section)))];

  // Handle section filter
  useEffect(() => {
    if (filterSection === 'All') {
      setCards(flashcardData);
    } else {
      setCards(flashcardData.filter(c => c.section === filterSection));
    }
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filterSection]);

  // Shuffle cards for quiz mode
  useEffect(() => {
    if (studyMode === 'quiz') {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
      setQuizScore({ correct: 0, incorrect: 0, total: cards.length });
    }
  }, [studyMode]);

  // Flip animation
  const flipCard = useCallback(() => {
    Vibration.vibrate(10); // Subtle haptic feedback
    
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  }, [isFlipped, flipAnimation]);

  // Card press animation
  const handleCardPress = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    flipCard();
  }, [flipCard, scaleAnimation]);

  // Navigation functions
  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      Vibration.vibrate(5);
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      flipAnimation.setValue(0);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      Vibration.vibrate(5);
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      flipAnimation.setValue(0);
    }
  };

  // Quiz mode handlers
  const markCorrect = () => {
    Vibration.vibrate([0, 50]);
    setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    nextCard();
  };

  const markIncorrect = () => {
    Vibration.vibrate([0, 50, 50, 50]);
    setQuizScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    nextCard();
  };

  // Interpolations for flip animation
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 0, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>DP-700 Flashcards</Text>
        <Text style={styles.subtitle}>Microsoft Fabric Data Engineer</Text>
      </View>

      {/* Mode Toggle */}
      <View style={styles.modeContainer}>
        <TouchableOpacity
          style={[styles.modeButton, studyMode === 'study' && styles.modeButtonActive]}
          onPress={() => setStudyMode('study')}>
          <Text style={[styles.modeText, studyMode === 'study' && styles.modeTextActive]}>
            Study
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, studyMode === 'quiz' && styles.modeButtonActive]}
          onPress={() => setStudyMode('quiz')}>
          <Text style={[styles.modeText, studyMode === 'quiz' && styles.modeTextActive]}>
            Quiz
          </Text>
        </TouchableOpacity>
      </View>

      {/* Section Filter - Scrollable */}
      <View style={styles.filterContainer}>
        {sections.map(section => (
          <TouchableOpacity
            key={section}
            style={[
              styles.filterButton,
              filterSection === section && styles.filterButtonActive,
            ]}
            onPress={() => setFilterSection(section)}>
            <Text
              style={[
                styles.filterText,
                filterSection === section && styles.filterTextActive,
              ]}>
              {section}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quiz Score */}
      {studyMode === 'quiz' && (
        <View style={styles.scoreContainer}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Correct</Text>
            <Text style={styles.scoreValue}>{quizScore.correct}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Incorrect</Text>
            <Text style={styles.scoreValue}>{quizScore.incorrect}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Remaining</Text>
            <Text style={styles.scoreValue}>
              {quizScore.total - quizScore.correct - quizScore.incorrect}
            </Text>
          </View>
        </View>
      )}

      {/* Flashcard */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleCardPress}
          style={styles.cardTouchable}>
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  { scale: scaleAnimation },
                  { perspective: 1000 },
                ],
              },
            ]}>
            {/* Front of card (Question) */}
            <Animated.View
              style={[
                styles.cardFace,
                styles.cardFront,
                {
                  transform: [{ rotateY: frontInterpolate }],
                  opacity: frontOpacity,
                },
              ]}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>QUESTION</Text>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{currentCard?.category}</Text>
              </View>
              <Text style={styles.questionText}>{currentCard?.question}</Text>
              <Text style={styles.tapHint}>Tap to reveal answer</Text>
            </Animated.View>

            {/* Back of card (Answer) */}
            <Animated.View
              style={[
                styles.cardFace,
                styles.cardBack,
                {
                  transform: [{ rotateY: backInterpolate }],
                  opacity: backOpacity,
                },
              ]}>
              <View style={[styles.badge, styles.badgeAnswer]}>
                <Text style={styles.badgeText}>✓ ANSWER</Text>
              </View>
              <Text style={styles.answerText}>{currentCard?.answer}</Text>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Navigation */}
      <View style={styles.navContainer}>
        {studyMode === 'quiz' ? (
          <>
            <TouchableOpacity style={styles.incorrectButton} onPress={markIncorrect}>
              <Text style={styles.buttonText}>✗ Didn't Know</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.correctButton} onPress={markCorrect}>
              <Text style={styles.buttonText}>✓ Got It!</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
              onPress={prevCard}
              disabled={currentIndex === 0}>
              <Text style={styles.navButtonText}>← Previous</Text>
            </TouchableOpacity>
            
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                <Text style={styles.counterCurrent}>{currentIndex + 1}</Text>
                <Text style={styles.counterTotal}> / {cards.length}</Text>
              </Text>
            </View>
            
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.navButtonNext,
                currentIndex === cards.length - 1 && styles.navButtonDisabled,
              ]}
              onPress={nextCard}
              disabled={currentIndex === cards.length - 1}>
              <Text style={styles.navButtonText}>Next →</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${((currentIndex + 1) / cards.length) * 100}%` },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  modeContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: '#6366f1',
  },
  modeText: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '600',
  },
  modeTextActive: {
    color: '#ffffff',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  filterButtonActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  filterText: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    padding: 16,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#60a5fa',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardTouchable: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.5,
  },
  card: {
    width: '100%',
    height: '100%',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 40,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardFront: {
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  cardBack: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeAnswer: {
    backgroundColor: '#22c55e',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  categoryText: {
    color: '#c4b5fd',
    fontSize: 13,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 20,
    lineHeight: 32,
    color: '#e2e8f0',
    fontWeight: '600',
    textAlign: 'center',
  },
  answerText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#d1fae5',
  },
  tapHint: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  navButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  navButtonNext: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 16,
    color: '#e2e8f0',
    fontWeight: '600',
  },
  incorrectButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#ef4444',
    alignItems: 'center',
  },
  correctButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#22c55e',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '700',
  },
  counterContainer: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    minWidth: 100,
  },
  counterText: {
    textAlign: 'center',
  },
  counterCurrent: {
    fontSize: 18,
    fontWeight: '700',
    color: '#60a5fa',
  },
  counterTotal: {
    fontSize: 16,
    color: '#64748b',
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 12,
  },
});

export default FlashcardScreen;
