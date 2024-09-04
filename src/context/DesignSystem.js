import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, ScrollView, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const colors = {
    primaryDark: '#291698',
    primary: '#3D21E4',
    primaryLight: '#9688ED',

    secondaryDark: '#645167',
    secondary: '#97799B',
    secondaryLight: '#C9A2CE',

    textDark: '#434343',
    text: '#525252',
    textLight: '#7B7B7B',
    textDisabled: '#C4C4C4',
    textGreenDark: '#095043',

    borderDark: '#434343',
    border: '#7B7B7B',
    borderLight: '#C4C4C4',
    borderDisabled: '#E9E9E9',

    iconDark: '#434343',
    icon: '#7B7B7B',
    iconLight: '#C4C4C4',
    iconDisabled: '#E9E9E9',
    iconChatRead: '#34b7f1',

    background: '#f5f5f5',
    backgroundLight: '#fbfbfb',
    backgroundPrimary: '#EBE8FD',
    backgroundSecondary: '#F6ECF7',
    backgroundChat: '#ECE5DD',
    backgroundError: '#FFC7C7',
    backgroundUnderReview: '#FFFBF1',
    backgroundActive: '#E9F8E9',

    surface: '#ffffff',
    surfacePrimary: '#BAB0F6',
    surfaceSecondary: '#E4CEE7',
    surfaceChatBubble: '#DCF8C6',
    surfaceYellow: '#FFEABA',

    error: '#B00020',
    underReview: '#FCB03c',
    active: '#128c7e',
}
const textStyles = {
    heading1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textDark,
    },
    heading2: {
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: -0.25,
        color: colors.text,
    },
    heading3: {
        fontSize: 13.5,
        fontWeight: 'bold',
        letterSpacing: -0.4,
        color: colors.text,
    },
    body: {
        fontSize: 14,
        fontWeight: 'normal',
        letterSpacing: -0.25,
        color: colors.textDark,
    },
    caption: {
        fontSize: 11,
        fontWeight: 'normal',
        letterSpacing: -0.4,
        color: colors.textLight,
    },
}
const iconSizes = {
    small: textStyles.caption.fontSize * 1.5,
    medium: textStyles.heading2.fontSize * 1.4,
    large: textStyles.heading1.fontSize * 1.4,
}
const opacities = {
    o1: 0.87,
    o2: 0.67,
    o3: 0.38,
    o4: 0.12,
}
const spacings = {
    small: 6,
    medium: 9,
    large: 12,
}
const textInputStyles = {
    large: {
        height: spacings.medium * 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.textDisabled,
        paddingHorizontal: spacings.medium,
        ...textStyles.body,
        color: "black",
        letterSpacing: 0.5,
    },
}

const DividerHorizontal = ({ style }) => {
    return (
        <View style={{
            height: 1,
            backgroundColor: colors.borderDisabled,
            ...style,
        }} />
    )
}
const DividerVertical = ({ style }) => {
    return (
        <View style={{
            width: 1,
            backgroundColor: colors.borderDisabled,
            ...style,
        }} />
    )
}
const ButtonOne = ({ title, onPress, style, disabled, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: disabled ? colors.background : colors.primary,
                height: spacings.medium * 4,
                borderRadius: 4,
                justifyContent: 'center',
                paddingHorizontal: spacings.medium * 2,
                elevation: disabled ? 0 : 5,
                ...style,
            }}>
            <Text style={{
                ...textStyles.heading2,
                color: disabled ? colors.textDisabled : "white",
                textAlign: "center",
                ...textStyle,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const ButtonOneUnfilled = ({ title, onPress, style, disabled, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: colors.surface,
                height: spacings.medium * 4,
                borderRadius: 4,
                borderColor: disabled ? colors.borderDisabled : colors.primary,
                borderWidth: 1,
                paddingHorizontal: spacings.medium * 2,
                justifyContent: 'center',
                ...style,
            }}>
            <Text style={{
                ...textStyles.heading2,
                color: disabled ? colors.textDisabled : colors.primary,
                textAlign: "center",
                ...textStyle,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const ButtonTwo = ({ title, onPress, style, disabled, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: disabled ? colors.background : colors.primary,
                height: spacings.medium * 3,
                borderRadius: 4,
                justifyContent: 'center',
                elevation: disabled ? 0 : 5,
                alignSelf: "flex-start",
                paddingHorizontal: spacings.medium * 2,
                ...style,
            }}>
            <Text style={{
                ...textStyles.heading3,
                color: disabled ? colors.textDisabled : "white",
                textAlign: "center",
                ...textStyle,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const ButtonTwoUnfilled = ({ title, onPress, style, disabled, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: colors.surface,
                height: spacings.medium * 3,
                borderRadius: 4,
                borderColor: disabled ? colors.borderDisabled : colors.primary,
                borderWidth: 1,
                justifyContent: 'center',
                alignSelf: "flex-start",
                paddingHorizontal: spacings.medium * 2,
                ...style,
            }}>
            <Text style={{
                ...textStyles.heading3,
                color: disabled ? colors.textDisabled : colors.primary,
                textAlign: "center",
                ...textStyle,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const CheckedBoxes = ({ titles, checkedTitles, containerStyle }) => {
    const checkedBoxes = titles.map((title, index) => {
        checkedTitles = checkedTitles || []
        return (
            <View key={index} style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: checkedTitles.includes(title) ? colors.backgroundPrimary : colors.background,
                height: spacings.medium * 4,
                borderRadius: 4,
                paddingHorizontal: spacings.large,
                marginBottom: spacings.small,
            }} >
                {checkedTitles.includes(title)
                    ? <MaterialIcons name="check" size={iconSizes.medium} color={colors.primary} />
                    : <MaterialIcons name="check" size={iconSizes.medium} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: checkedTitles.includes(title) ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </View>
        )
    })
    return (
        <View style={{ ...containerStyle }}>
            {checkedBoxes}
        </View>
    )
}
const CheckBoxes = ({ titles, selected, setSelected, containerStyle, buttonStyle }) => {
    const checkBoxes = titles.map((title, index) => {
        selected = selected || []
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    if (selected.includes(title)) {
                        setSelected(selected.filter(item => item !== title))
                    } else {
                        setSelected([...selected, title])
                    }
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selected.includes(title) ? colors.backgroundPrimary : colors.background,
                    height: spacings.medium * 4,
                    borderRadius: 4,
                    paddingHorizontal: spacings.large,
                    marginBottom: spacings.small,
                    ...buttonStyle,
                }} >
                {selected.includes(title)
                    ? <MaterialIcons name="check-box" size={iconSizes.small} color={colors.primary} />
                    : <MaterialIcons name="check-box-outline-blank" size={iconSizes.small} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: selected.includes(title) ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View style={{ ...containerStyle }}>
            {checkBoxes}
        </View>
    )
}
const CheckBoxesTemp = ({ titles, selected, setSelected, containerStyle, buttonStyle }) => {
    const checkBoxes = titles.map((title, index) => {
        selected = selected || []
        return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelected(title)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selected.includes(title) ? colors.backgroundPrimary : colors.background,
                    height: spacings.medium * 4,
                    borderRadius: 4,
                    paddingHorizontal: spacings.large,
                    marginBottom: spacings.small,
                    ...buttonStyle,
                }} >
                {selected.includes(title)
                    ? <MaterialIcons name="check-box" size={iconSizes.small} color={colors.primary} />
                    : <MaterialIcons name="check-box-outline-blank" size={iconSizes.small} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: selected.includes(title) ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View style={{ ...containerStyle }}>
            {checkBoxes}
        </View>
    )
}

const RadioButtons = ({ titles, selected, setSelected, buttonStyle, containerStyle }) => {
    const radioButtons = titles.map((title, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelected(title)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selected === title ? colors.backgroundPrimary : colors.background,
                    height: spacings.medium * 4,
                    borderRadius: 4,
                    paddingLeft: spacings.large,
                    paddingRight: spacings.large * 1.2,
                    marginBottom: spacings.small,
                    ...buttonStyle,
                }} >
                {selected === title
                    ? <MaterialIcons name="radio-button-checked" size={iconSizes.small} color={colors.primary} />
                    : <MaterialIcons name="radio-button-unchecked" size={iconSizes.small} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: selected === title ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View
            style={{ ...containerStyle }}
        >
            {radioButtons}
        </View>
    )
}
const RadioButtonsTemp = ({ titles, selected, setSelected, buttonStyle, containerStyle, horizontal }) => {
    const radioButtons = titles.map((title, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelected(title)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selected === title ? colors.backgroundPrimary : colors.background,
                    height: spacings.medium * 4,
                    borderRadius: 4,
                    paddingHorizontal: spacings.large,
                    marginBottom: spacings.small,
                    ...buttonStyle,
                }} >
                {selected === title
                    ? <MaterialIcons name="radio-button-checked" size={iconSizes.small} color={colors.primary} />
                    : <MaterialIcons name="radio-button-unchecked" size={iconSizes.small} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: selected === title ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <ScrollView
            horizontal={horizontal}
            style={{ ...containerStyle }}
        >
            {radioButtons}
        </ScrollView>
    )
}
const TextInputWithDropdown = ({ titles, value, onChangeText, onSelect, onFocus, onBlur, placeholder, multiline, editable, containerStyle, buttonStyle, dropdownContainerStyle, style }) => {

    // In iOS: for dropdown to stay on top, 
    // the View containing the TextInputWithDropdown must be set with zIndex higher than the components below

    value = value || ""
    const filteredTitles = titles.filter(title => {
        return title.toLowerCase().includes(value.toLowerCase())

    })
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const dropDown = filteredTitles.map((title, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    onChangeText(title)
                    if (onSelect) {
                        onSelect(title)
                    }
                    setDropdownVisible(false)
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: value === title ? colors.backgroundPrimary : colors.backgroundLight,
                    height: spacings.medium * 4,
                    borderRadius: 4,
                    marginTop: spacings.small,
                    ...buttonStyle,
                }} >
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: value === title ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >
                    {title}
                </Text>
            </TouchableOpacity>
        )
    })
    return (
        <View style={{
            ...containerStyle
        }}>
            <TextInput
                style={{
                    ...textInputStyles.large,
                    ...style,
                }}
                value={value}
                editable={editable}
                onChangeText={(text) => {
                    onChangeText(text)
                    setDropdownVisible(true)
                }}
                placeholder={placeholder}
                multiline={multiline}
                onSubmitEditing={() => setDropdownVisible(false)}
                onFocus={() => {
                    setDropdownVisible(false)
                    if (onFocus) {
                        onFocus()
                    }
                }}
                onBlur={() => {
                    if (onBlur) {
                        onBlur()
                    }
                }}
            />
            {value.length > 0 && dropdownVisible &&
                <ScrollView style={{
                    position: "absolute",
                    top: textInputStyles.large.height,
                    left: 0,
                    right: 0,
                    elevation: 1,
                    backgroundColor: colors.surface,
                    borderRadius: 4,
                    borderColor: colors.borderDisabled,
                    borderWidth: 1,
                    paddingHorizontal: spacings.large,
                    paddingVertical: spacings.small,
                    maxHeight: textInputStyles.large.height * 5,
                    ...dropdownContainerStyle,
                }} >
                    {dropDown}
                </ScrollView>
            }

        </View>
    )
}

const alertPolyfill = (title, description, options, extra) => {
    const result = window.confirm([title, description].filter(Boolean).join('\n'))

    if (result) {
        const confirmOption = options.find(({ style }) => style !== 'cancel')
        confirmOption && confirmOption.onPress()
    } else {
        const cancelOption = options.find(({ style }) => style === 'cancel')
        cancelOption && cancelOption.onPress()
    }
}
const AlertAllPlatforms = Platform.OS === 'web' ? alertPolyfill : Alert.alert






export { colors, opacities, spacings, iconSizes, textStyles, textInputStyles, DividerHorizontal, DividerVertical, ButtonOne, ButtonOneUnfilled, ButtonTwo, ButtonTwoUnfilled, CheckedBoxes, CheckBoxes, CheckBoxesTemp, RadioButtons, RadioButtonsTemp, TextInputWithDropdown, AlertAllPlatforms };
