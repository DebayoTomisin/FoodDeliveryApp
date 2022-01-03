import React, { useEffect, useState } from 'react'
import { View, Text,SafeAreaView, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native'

import { isIphoneX } from 'react-native-iphone-x-helper'
import { icons, SIZES, FONTS, COLORS } from '../constants'

const Resturant = ({ route, navigation }) =>
{
    const scrollX = new Animated.Value(0);
    const [resturant, setResturant] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() =>{
        let { item, currentLocation } = route.params

        setResturant(item)
        setCurrentLocation(currentLocation)
    })

    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(ix => ix.menuId == menuId)

        if (action == '+') {
            if(item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            }
            else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }
            setOrderItems(orderList)
        }
        else {
            if (item.length > 0){
                if(item[0].qty > 0) {
                    let newqty = item[0].qty - 1
                    item[0].qty = newqty
                    item[0].total = newqty * price
                }
            }
            setOrderItems(orderList)
        }
    }

    const getOrderQantity = (menuId) =>
    {
        let orderList = orderItems.filter(item => item.menuId == menuId)

        if (orderList.length > 0){
            return orderList[0].qty
        }

        return 0
    }

    const getBasketItemCount = () => 
    {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    const sumOrder = () => 
    {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }
    
    function renderHeader() {
        return(
            <View style= {{flexDirection: 'row'}}>
                <TouchableOpacity 
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={icons.back} resizeMode='contain' style={{ width: 30, height: 30 }} />
                </TouchableOpacity>

                <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View 
                        style={{
                            height: 50,
                            alignItems:'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 2,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{ ...FONTS.h3}}>{resturant?.name}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight:SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.list}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            {renderHeader()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})

export default Resturant
