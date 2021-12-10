import React, { useState,} from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'

import { categoryData, initialCurrentLocation, ResturantData } from '../data'

const Home = ({ navigation }) =>
{
    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [resturants, setResturants] = useState(ResturantData)
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)

    function onSelectCategory(category) {
        let resturantList = ResturantData.filter(item => item.categories.includes(category.id))

        setResturants(resturantList)

        selectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(item => item.id == id)

        if (category.length > 0)
            return category[0].name
        
        return ""
    }

    function renderHeader () {
        return(
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image source={icons.nearby} resizeMode='contain' style={{ width: 30, height: 30 }} />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: '100%',
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.basket}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return(
                <TouchableOpacity
                    style={{
                        padding:SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image source={item.icon} resizeMode="contain" style={{ width: 30, height: 30 }} />
                    </View>

                    <Text style={{ marginTop: SIZES.padding, color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black, ...FONTS.h3 }}>
                        {item.name}
                    </Text>

                </TouchableOpacity>
            )
        }
        return(
            <View>
                <Text style={{ ...FONTS.h1 }}>Main</Text>
                <Text style={{ ...FONTS.h1 }}>Categories</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    return(
        <View style={{}}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Home
