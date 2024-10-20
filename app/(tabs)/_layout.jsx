import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useRef } from "react";
import { findNodeHandle, UIManager } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <View style={isFocused ? styles.bound : null}>
              <Feather
                name={options.tabBarIcon({ focused: isFocused }).props.name}
                size={25}
                color={isFocused ? "white" : "black"}
              />
              {isFocused ? (
                <Text
                  style={[
                    styles.title,
                    { color: isFocused ? "white" : "black" },
                  ]}
                >
                  {label}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabRoot = () => {
  return (
    <>
      <Tabs
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                size={20}
                color={focused ? "#14B8A6" : "#94A3B8"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="search"
                size={22}
                color={focused ? "#14B8A6" : "#94A3B8"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="save"
          options={{
            title: "Save",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="bookmark"
                size={22}
                color={focused ? "#14B8A6" : "#94A3B8"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={22}
                color={focused ? "#14B8A6" : "#94A3B8"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "white",
    height: 46,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  bound: {
    backgroundColor: "#669bbc",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "80%",
    justifyContent: "center",
    borderRadius: 30,
  },
  title: {
    marginLeft: 5,
  },
});
