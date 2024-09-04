import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StatusBar, StyleSheet, Text, TextInput, View, SafeAreaView, Image } from 'react-native';
import { colors, opacities, spacings, textStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal } from '../context/DesignSystem';
import { UserContext } from '../context/UserContext';



const SplashScreen = ({ navigation }) => {
    const { setCurrentUser, fetchUserById } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                const currentUserId = userToken;
                const currentUser = await fetchUserById(currentUserId);
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'MainTab',
                        params: { screen: 'HomeScreen' }
                    }]
                })
                setCurrentUser(currentUser);
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'PhoneScreen' }]
                });
            }
        })
        return unsubscribe
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.blueView}>
                <Image source={require('../images/logo.png')} style={styles.imageStyle} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    blueView: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    imageStyle: {
        height: 60,
        alignSelf: 'center',
        marginTop: 100,
        // marginHorizontal: 20,
        resizeMode: 'contain',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: spacings.large,
    },

})

export default SplashScreen;