import { StyleSheet, Alert, Text, View, ActivityIndicator, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, ButtonOneUnfilled, RadioButtons, TextInputWithDropdown } from '../context/DesignSystem';

const ProductDetailsScreen = ({ route, navigation }) => {
    const { partNumber } = route.params

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.title}>Product Details</Text>
                    </View>
                    <View
                        style={styles.rfqContainer}
                    >
                        <Text>{partNumber}</Text>
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.title}>Actions</Text>
                    <DividerHorizontal />
                    <ButtonOneUnfilled
                        title="Creat new RFQ"
                        onPress={() => navigation.navigate('CreateRfqScreen', { partNumber })}
                        style={styles.screenButton}
                    />
                    <ButtonOneUnfilled
                        title="Request Sample"
                        onPress={() => navigation.navigate('CreateRfqScreen', { partNumber })}
                        style={styles.screenButton}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    sectionContainer: {
        backgroundColor: colors.surface,
        marginBottom: spacings.large,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionHeaderRightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: spacings.large,
    },
    activateButton: {
        marginRight: spacings.small,
    },
    rfqContainer: {
        padding: spacings.large,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.borderDisabled,
        backgroundColor: colors.surface,
        margin: spacings.large,
        marginTop: 0,
    },
    title: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        padding: spacings.large,
    },
    supplierName: {
        ...textStyles.heading3,
        marginBottom: spacings.small,
    },
    topCellsText: {
        ...textStyles.caption,
        color: colors.secondaryDark,
    },
    labelDetails: {
        ...textStyles.caption,
        color: 'black',
    },
    bottomCellsText: {
        ...textStyles.caption,
        fontWeight: 'bold',
        color: colors.secondaryDark,
    },
    bidThumbnailContainer: {
        padding: spacings.large,
    },
    bidThumbnailTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: spacings.small / 2,
    },
    acceptBidButton: {
        backgroundColor: colors.backgroundActive,
        elevation: 0,
    },
    acceptBidButtonText: {
        color: colors.textGreenDark,
    },
    rejectBidButton: {
        backgroundColor: colors.background,
        borderWidth: 0,
        alignSelf: 'flex-end',
    },
    rejectBidButtonText: {
        color: colors.error,
    },
    bidThumbnailTopRightContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    acceptedStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacings.small,
    },
    acceptedStatusText: {
        ...textStyles.heading3,
        color: colors.active,
    },
    bidContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacings.medium,
        borderWidth: 1,
        borderColor: colors.backgroundPrimary,
    },

    textInput: {
        ...textInputStyles.large,
        backgroundColor: colors.surface,
        marginTop: spacings.medium,
        marginBottom: spacings.large,
        marginHorizontal: spacings.medium,
    },
    inputContainer: {
        backgroundColor: colors.surface,
    },


    labelBold: {
        ...textStyles.caption,
        fontWeight: 'bold',
        color: colors.textDark,
    },
    label: {
        ...textStyles.caption,
        marginBottom: spacings.small / 2,
    },
    bidsLabel: {
        ...textStyles.caption,
        color: colors.secondaryDark,
        marginBottom: spacings.small / 2,
    },
    quoteDetail: {
        ...textStyles.heading3,
        color: 'black',
    },
    bidsContainer: {
        flexDirection: 'row',
        padding: spacings.large,
        paddingTop: 0,
    },
    bidsInnerContainer: {
        marginRight: spacings.small,
        backgroundColor: colors.backgroundPrimary,
        paddingVertical: spacings.small,
        paddingHorizontal: spacings.medium,
        borderRadius: 5,
    },
    myBidContainer: {
        flex: 1,
        paddingVertical: spacings.small,
        paddingHorizontal: spacings.medium,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.backgroundPrimary,
    },
    myBidInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    submit: {
        ...textStyles.heading3,
        color: colors.primary,
        fontWeight: 'bold',
    },
    screenButton: {
        margin: spacings.large,
    },
    noBidsText: {
        ...textStyles.caption,
        color: colors.textDark,
        padding: spacings.large * 2,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
    },
    modalTopContainer: {
        height: 150,
        backgroundColor: colors.surfacePrimary,
    },
    modalBottomContainer: {
        flex: 1,
        backgroundColor: colors.surface,
        padding: spacings.large,
    },
    modalHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: spacings.large * 2,
        paddingTop: spacings.large * 1.5,
        paddingBottom: spacings.small,
    },
    modalHeaderText: {
        ...textStyles.heading1,
        fontWeight: 'bold',
    },


    bidColumnsContainer: {
        flex: 1,
    },
    topCellsContainer: {
        height: spacings.medium * 4,
        backgroundColor: colors.backgroundPrimary,
        padding: spacings.small / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomCellsContainer: {
        backgroundColor: colors.surface,
        padding: spacings.small,
        alignItems: 'center',
    },
    bottomNotesText: {
        ...textStyles.caption,
        color: colors.textDark,
        fontWeight: 'bold',
        marginTop: spacings.large,
    },
    bottomNotesLabel: {
        ...textStyles.caption,
        marginTop: spacings.small / 2,
    },



})