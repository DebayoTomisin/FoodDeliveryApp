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

    function renderFoodInfo() {
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={ Animated.event([
                    { nativeEvent : { contentOffset: { x: scrollX }}}
                ], { useNativeDriver: false })}
            >
                {
                    resturant?.menu.map((item, index) => (
                        <View style={{ alignItems: 'center' }} key={`menu-${index}`}>
                            <View style={{ height: SIZES.height * 0.35}}>
                                <Image
                                    source={item.photo}
                                    resizeMode='cover'
                                    style={{
                                        width:SIZES.width,
                                        height: "100%"
                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: -20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                    }} 
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h2 }}>{getOrderQantity(item.menuId)}</Text>
                                    </View> 

                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1}}>+</Text>
                                    </TouchableOpacity>    
                                </View>
                            </View>

                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name} - {item.price.toFixed(2)}</Text>
                                <Text style={{...FONTS.body3}}>{item.description}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Image source={icons.fire} style={{ height: 20, width: 20, marginRight: 10 }} />
                                <Text style={{ ...FONTS.h2, color: COLORS.darkgray }}>{item.calories.toFixed(2)} cal</Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
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
