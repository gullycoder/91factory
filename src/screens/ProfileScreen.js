import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Button, Alert, ScrollView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, ButtonOneUnfilled, AlertAllPlatforms } from '../context/DesignSystem';



const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);


  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.sectionContainer}
          onPress={() => {
            navigation.navigate('AdminConsoleScreen')
          }}
        >
          <MaterialIcons name="apps" size={iconSizes.large} color={colors.icon} />
          <Text style={styles.sectionHeading}>
            Admin Console
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionContainer}
          onPress={async () => {
            AlertAllPlatforms(
              'Logout',
              'Are you sure you want to logout?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => console.log('Cancel Pressed'),
                },
                {
                  text: 'OK', onPress: async () => {
                    try {
                      setLoading(true)
                      await AsyncStorage.removeItem('userToken');
                      setLoading(false)
                      navigation.reset({
                        index: 0,
                        routes: [{
                          name: 'AuthStack',
                          params: { screen: 'PhoneScreen' }
                        }],
                      });

                    } catch (e) {
                      console.log(e);
                    }
                  }
                }
              ],
              { cancelable: false }
            )
          }}
        >
          <MaterialIcons name="logout" size={iconSizes.large} color={colors.icon} />
          <Text style={styles.sectionHeading}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileContainer: {
    backgroundColor: colors.surface,
    marginLeft: spacings.medium,
  },
  editProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.surface,
    padding: spacings.large,
    elevation: 1,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.surface,
    padding: spacings.large,
    marginTop: spacings.medium,
    elevation: 1,
  },
  sectionHeading: {
    ...textStyles.body,
    marginLeft: spacings.medium,
  },
  editPinContainer: {
    flex: 1,
    padding: spacings.large,
    marginTop: spacings.medium,
    backgroundColor: colors.surface,
    elevation: 1,
  },
  label: {
    ...textStyles.body,
    fontWeight: 'bold',
  },


  textInputContainer: {
    justifyContent: 'center',
    margin: spacings.large,
    marginBottom: 0,
  },
  textInput: {
    ...textInputStyles.large,
    textAlign: "center",
    letterSpacing: 2,
  },
  clearTextIconContainer: {
    position: "absolute",
    right: spacings.small,
    justifyContent: "center",
    alignItems: "center",
    width: spacings.medium * 2.5,
    height: spacings.medium * 2.5,
    borderRadius: spacings.medium * 1.25,
    backgroundColor: colors.borderDisabled,
  },

  adminContainer: {
    backgroundColor: colors.surface,
    marginTop: spacings.medium * 2,
    elevation: 2,
  },
  userContainer: {
    backgroundColor: colors.surface,
    elevation: 2,
    marginBottom: spacings.medium,
    padding: spacings.medium,
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacings.large,
    paddingTop: spacings.large,
  },
  nameText: {
    ...textStyles.heading2,
    fontWeight: 'bold',
    marginBottom: spacings.small,
  },
  infoText: {
    ...textStyles.caption,
    marginBottom: spacings.small,
  },
  consoleHeading: {
    ...textStyles.heading2,
    padding: spacings.large,
  },
  consoleSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingVertical: spacings.large * 1.5,
    paddingHorizontal: spacings.large,
  },
  consoleSectionHeading: {
    ...textStyles.body,
    fontWeight: 'bold',
    marginLeft: spacings.medium,
  },



})