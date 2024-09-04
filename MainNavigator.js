import * as React from 'react';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import RFQsScreen from './src/screens/RFQsScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PhoneScreen from './src/screens/PhoneScreen';
import OtpScreen from './src/screens/OtpScreen';
import AdminConsoleScreen from './src/screens/AdminConsoleScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import SplashScreen from './src/screens/SplashScreen';
import CreateRfqScreen from './src/screens/CreateRfqScreen';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from './src/context/DesignSystem';
// import { UserContext } from './src/context/UserContext';


const MainStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </Stack.Navigator>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "left",
            headerTintColor: colors.primary,
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    title: '91factory',
                }} />
            <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen}
                options={{
                    title: 'Product Details',
                }} />
            <Stack.Screen name="CreateRfqScreen" component={CreateRfqScreen}
                options={{
                    title: 'Create RFQ',
                }} />
        </Stack.Navigator>
    );
};
const RFQsStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "left",
            headerTintColor: colors.primary,
        }}>
            <Stack.Screen name="RFQsScreen" component={RFQsScreen}
                options={{
                    title: '91factory',
                }} />
        </Stack.Navigator>
    );
};
const OrdersStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "left",
            headerTintColor: colors.primary,
        }}>
            <Stack.Screen name="OrdersScreen" component={OrdersScreen}
                options={{
                    title: 'Orders',
                }} />
        </Stack.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "left",
            headerTintColor: colors.primary,
        }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}
                options={{
                    title: 'Profile',
                }} />
            <Stack.Screen name="AdminConsoleScreen" component={AdminConsoleScreen}
                options={{
                    title: 'Admin Console',
                }} />
        </Stack.Navigator>
    );
};

const MainTab = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'HomeStack') {
                        iconName = "work-outline";
                    } else if (route.name === 'RFQsStack') {
                        iconName = "workspaces-outline";
                    } else if (route.name === 'OrdersStack') {
                        iconName = "format-list-bulleted";
                    } else if (route.name === 'ProfileStack') {
                        iconName = "perm-identity";
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text,
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: textStyles.caption.fontSize,
                    fontWeight: "bold",
                },
            })}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={({ route }) => ({
                    tabBarLabel: "Home",
                })}
            />
            <Tab.Screen
                name="RFQsStack"
                component={RFQsStack}
                options={({ route }) => ({
                    tabBarLabel: "RFQs",
                })}
            />
            <Tab.Screen
                name="OrdersStack"
                component={OrdersStack}
                options={{ tabBarLabel: 'Orders' }}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name="AuthStack" component={AuthStack} />
            <MainStack.Screen name="MainTab" component={MainTab} />
        </MainStack.Navigator>
    );
};

export default MainNavigator;