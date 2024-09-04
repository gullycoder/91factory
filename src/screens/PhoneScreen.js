import { useContext, useRef, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal } from '../context/DesignSystem';

const PhoneScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.innerContainer}>
                <Text style={styles.welcome}>
                    91factory
                </Text>
                <Text style={styles.enterMobile}>
                    Enter your mobile number below
                </Text>
                <View style={styles.inputView}>
                    <Text style={styles.nineOne}>
                        +91
                    </Text>
                    <DividerVertical style={{ backgroundColor: colors.borderLight, height: 32 }} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Mobile Number"
                        autoFocus
                        autoCompleteType="tel"
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        // value={phoneNumber}
                        returnKeyLabel="done"
                        onChangeText={phoneNumber => {
                            setPhoneNumber(phoneNumber);
                            setFormattedPhoneNumber(`+91${phoneNumber}`);
                        }}
                    />
                </View>
                <Text style={styles.helperText}>
                    Enter your mobile number registered with 91factory.
                    You will be logged in after mPIN verification.
                </Text>
                {isLoading
                    ? <ActivityIndicator size="large" color={colors.primary} />
                    : <ButtonOne
                        title="Next"
                        style={{ marginBottom: 16, }}
                        disabled={phoneNumber.length !== 10 || isLoading}
                        onPress={() => {
                            setIsLoading(true);
                            navigation.navigate('OtpScreen', {
                                phoneNumber, formattedPhoneNumber,
                            });
                            setIsLoading(false);
                        }}
                    />}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    innerContainer: {
        height: 440,
        justifyContent: 'center',
        padding: spacings.large * 2,
    },
    welcome: {
        ...textStyles.heading1,
        fontSize: textStyles.heading1.fontSize * 2,
        fontWeight: 'bold',
        textAlign: "center",
        color: colors.primary,
        marginBottom: spacings.medium * 3,
    },
    enterMobile: {
        ...textStyles.heading2,
        textAlign: "center",
        fontWeight: "normal",
        marginBottom: spacings.medium,
    },
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        height: spacings.medium * 4.5,
        marginBottom: spacings.large,
        borderRadius: 4,
        borderColor: colors.borderLight,
        borderWidth: 1,
    },
    nineOne: {
        ...textStyles.heading2,
        color: colors.textLight,
        paddingHorizontal: spacings.large,
    },
    textInput: {
        ...textStyles.heading2,
        color: "black",
        letterSpacing: 3,
        paddingHorizontal: spacings.large,
        flex: 1,
    },
    helperText: {
        ...textStyles.caption,
        textAlign: "center",
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
})

export default PhoneScreen;


