import React, { useState,} from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'

import { categoryData, initialCurrentLocation, ResturantData } from '../data'

const Home = () =>
{
    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [resturant, setResturant] = useState(ResturantData)
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)

    function onSelectCategory(category) {
        let resturantList = ResturantData.filter(item => item.categories.includes(category.id))

        setResturant(resturantList)

        selectedCategory(category)
    }

    function getCategoryNameId(id) {
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

    return(
        <View>

        </View>
    )
}

export default Home
