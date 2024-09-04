import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { bulkUploadProducts } from '../data/Data'
import { ButtonOne, spacings } from '../context/DesignSystem'
import { ProductContext } from '../context/ProductContext'


const AdminConsoleScreen = () => {
    const { products, uploadProducts } = React.useContext(ProductContext)

    // break up products into groups of 500
    const productstry = bulkUploadProducts.slice(0, 2)
    const products1 = bulkUploadProducts.slice(0, 500)
    const products2 = bulkUploadProducts.slice(500, 1000)


    return (
        <View>
            <ButtonOne
                title="Upload Products try"
                // disabled={true}
                style={{ margin: spacings.large * 2 }}
                onPress={async () => {
                    await uploadProducts(products1)
                }}
            />
        </View>
    )
}

export default AdminConsoleScreen

const styles = StyleSheet.create({})