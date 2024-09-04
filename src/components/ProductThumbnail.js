import { StyleSheet, Text, View, TextInput, ActivityIndicator, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, DividerHorizontal } from '../context/DesignSystem';

const ProductThumbnail = ({ product, navigation }) => {
    return (
        <TouchableOpacity
            key={product.id}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: colors.white, borderRadius: 10, marginVertical: 5 }}
            onPress={() => navigation.navigate('ProductDetailsScreen', { partNumber: product.partNumber })}
        >
            <Text style={textStyles.large}>{product.partNumber}</Text>
            <DividerHorizontal />
        </TouchableOpacity>

    )
}

export default ProductThumbnail

const styles = StyleSheet.create({})