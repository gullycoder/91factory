import { StyleSheet, Text, View, TextInput, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import React from 'react'
import { UserContext } from '../context/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerHorizontal } from '../context/DesignSystem';


const OtpScreen = ({ route, navigation, }) => {
  const [code, setCode] = React.useState('')
  const { phoneNumber, formattedPhoneNumber } = route.params;
  const { users, createUser, currentUser, setCurrentUser, fetchUserById } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const userToBeCreated = { id: phoneNumber, phone: formattedPhoneNumber };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primaryDark} />
      <View style={styles.innerContainer}>
        <Text style={styles.enterOtp}>
          Enter mPIN
        </Text>
        <Text style={styles.otpSent}>
          You've entered {formattedPhoneNumber}
        </Text>
        <Text style={styles.otpSent}>
          Please enter the mPIN provided to you by 91factory
        </Text>
        <TextInput
          value={code}
          placeholder="Enter 4-digit mPIN"
          autoFocus
          // autoComplete="sms-otp"
          keyboardType="numeric"
          maxLength={4}
          onChangeText={(text) => {
            setCode(text)
            console.log(text)
          }}
          style={styles.textInput}
          returnKeyLabel="done"
        />
        {isLoading
          ? <ActivityIndicator size="large" color={colors.primary} />
          : <ButtonOne
            title="Submit"
            disabled={code.length !== 4 || isLoading}
            onPress={() => {
              const onPressFunction = async () => {
                setIsLoading(true);
                if (code === '0000') {
                  const user = await fetchUserById(userToBeCreated.id);
                  if (!user.error) {
                    try {
                      await AsyncStorage.setItem('userToken', user.user.id);
                      setCurrentUser(user.user)
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainTab' }],
                      })
                    } catch (e) {
                      alert(e)
                    }
                  } else {
                    const newUser = await createUser(userToBeCreated);
                    if (!newUser.error) {
                      try {
                        await AsyncStorage.setItem('userToken', newUser.user.id);
                        setCurrentUser(newUser.user);
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'MainTab' }],
                        })
                      } catch (e) {
                        alert(e)
                      }
                    } else {
                      alert(newUser.error);
                    }
                  }
                } else {
                  alert('Invalid mpin')
                }
                setIsLoading(false);
              }
              onPressFunction()
            }}
          />
        }
      </View>
      <View style={styles.bottomView}>
        <DividerHorizontal />
        <Text style={styles.helperTextBottom}>
          By signing up, you agree to 91factory's Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default OtpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    justifyContent: "center",
    height: 300,
    padding: spacings.large * 2,
  },
  enterOtp: {
    ...textStyles.heading1,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: spacings.medium * 2,
  },
  otpSent: {
    ...textStyles.heading3,
    textAlign: "center",
    fontWeight: "normal",
    marginBottom: spacings.medium,
  },
  textInput: {
    ...textInputStyles.large,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 4,
    marginBottom: spacings.large,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: spacings.large * 2,
  },
  helperTextBottom: {
    ...textStyles.caption,
    textAlign: "center",
    marginVertical: spacings.medium,
  },
  error: {
    ...textStyles.caption,
    textAlign: "center",
    color: colors.error,
    marginBottom: spacings.medium,
  }
})