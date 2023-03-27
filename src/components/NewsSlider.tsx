/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView, Text, Dimensions, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
  Extrapolate,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

const textColor = '#2A3B38';
const gray = '#A0A0A0';
const slideWidth = width * 0.75;
const slideHeight = height * 0.3;

const slides = [
  {
    text: 'Code',
    icon: 'code-slash',
  },
  {
    text: 'Enjoy Life',
    icon: 'cafe',
  },
  {
    text: '@useRNRocket',
    icon: 'rocket-sharp',
  },
];

const Slide = ({slide, scrollOffset, index}: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / slideWidth;
    const inputRange = [index - 1, index, index + 1];

    return {
      transform: [
        {
          scale: interpolate(
            input,
            inputRange,
            [0.8, 1, 0.8],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      key={index}
      style={[
        {
          flex: 1,
          width: slideWidth,
          height: slideHeight,
          paddingVertical: 0,
          borderColor: textColor,
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 10,
        },
        animatedStyle,
      ]}>
      <Image
        source={{uri: slide.media}}
        style={{
          width: '100%',
          height: slideHeight * 0.7,
          resizeMode: 'cover',
          borderRadius: 10,
        }}
      />
      <View
        style={{
          padding: 10,
          alignItems: 'center',

          height: slideHeight * 0.2,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: textColor,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {slide.title}
        </Text>
      </View>
    </Animated.View>
  );
};

const Indicator = ({scrollOffset, index}: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / slideWidth;
    const inputRange = [index - 1, index, index + 1];
    const animatedColor = interpolateColor(input, inputRange, [
      gray,
      textColor,
      gray,
    ]);

    return {
      width: interpolate(input, inputRange, [20, 40, 20], Extrapolate.CLAMP),
      backgroundColor: animatedColor,
    };
  });

  return (
    <Animated.View
      style={[
        {
          marginHorizontal: 5,
          height: 20,
          borderRadius: 10,
          backgroundColor: textColor,
        },
        animatedStyle,
      ]}
    />
  );
};

const IndicatorExample = ({data}) => {
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-around'}}>
      <Animated.ScrollView
        scrollEventThrottle={1}
        horizontal
        snapToInterval={slideWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: (width - slideWidth) / 2,
          justifyContent: 'center',
        }}
        onScroll={scrollHandler}>
        {data?.map((slide, index) => {
          return (
            <Slide
              key={index}
              index={index}
              slide={slide}
              scrollOffset={scrollOffset}
            />
          );
        })}
      </Animated.ScrollView>
      {/* <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        {data?.map((_, index) => {
          return (
            <Indicator key={index} index={index} scrollOffset={scrollOffset} />
          );
        })}
      </View> */}
    </SafeAreaView>
  );
};

export default IndicatorExample;
