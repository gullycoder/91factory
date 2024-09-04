import { StyleSheet, Text, View, TextInput, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import React from 'react'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, DividerHorizontal } from '../context/DesignSystem';
import { ProductContext } from '../context/ProductContext';
import ProductThumbnail from '../components/ProductThumbnail';

const HomeScreen = ({ navigation }) => {
  const [text, setText] = React.useState(null);
  const { products, fetchProducts } = React.useContext(ProductContext);
  const [showResults, setShowResults] = React.useState(false);
  const [searchKeyword, setSearchKeyword] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchProducts();
    });
    return unsubscribe;
  }, [navigation]);

  const popularProducts = products.filter((product) => {
    return product.partNumber > 101;
  });
  const popularProductsList = popularProducts.map((product) => {
    return (
      <View key={product.id}>
        <ProductThumbnail
          product={product}
          navigation={navigation}
        />
      </View>
    )
  });

  const searchResults = products.filter((product) => {
    return product.partNumber === searchKeyword;
  });
  const searchResultsList = searchResults.map((product) => {
    return (
      <View key={product.id}>
        <ProductThumbnail
          product={product}
          navigation={navigation}
        />
      </View>
    )
  });


  return (
    <View>
      <TextInput
        value={text}
        style={styles.textInput}
        placeholder="Enter part number"
        onChangeText={(text) => {
          setText(text);
        }}
      />
      <ButtonOne
        title="Search"
        onPress={() => {
          setShowResults(true);
          setSearchKeyword(text);
        }}
      />
      {showResults
        ? <View>
          <Text style={textStyles.large}>
            Results
          </Text>
          <DividerHorizontal />
          {searchResults.length > 0
            ? searchResultsList
            : <Text style={textStyles.large}>No results</Text>}
        </View>
        : null
      }
      <Text style={textStyles.large}>
        Popular products
      </Text>
      <DividerHorizontal />
      {products.length > 0 ? popularProductsList : <ActivityIndicator />}

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  textInput: {
    ...textInputStyles.large,
    backgroundColor: colors.surface,
    marginTop: spacings.medium,
    marginBottom: spacings.large,
    marginHorizontal: spacings.medium,
  },
})