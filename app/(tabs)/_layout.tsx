import {View, Text, Image} from 'react-native'
import React from 'react'
import {Redirect, Slot, Tabs} from "expo-router";
import cn from "clsx";
import {TabBarIconProps} from "@/type";
import {images} from "@/constants";

const TabBarIcon = ({focused,icon,title}:TabBarIconProps) => {
    return (
        <View className={"tab-icon"}>
            <Image source={icon} resizeMode="contain" tintColor={focused ? "#FE8C00" : "#5D5F6D"} className={"size-7"}/>
            <Text className={cn("text-sm font-bold", focused ? "text-primary":"text-gray-200")}>{title}</Text>
        </View>
    )
}

const TabsLayout = () => {
    const isAuthenticated = true;

    if(!isAuthenticated){
        return (
            <Redirect href={"/(auth)/sign-in"} />
        )
    }
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderRadius: 50,
                marginHorizontal: 20,
                height: 80,
                position: "absolute",
                bottom: 40,
                backgroundColor: "white",
                shadowColor: "#1a1a1a",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
            },
        }}>
            <Tabs.Screen
                name={"index"}
                options={
                    {
                        title: "Home",
                        tabBarIcon: ({focused}) => <TabBarIcon icon={images.home} focused={focused} title={"Home"} />
                    }
                }
            />
            <Tabs.Screen
                name={"search"}
                options={
                    {
                        title: "Search",
                        tabBarIcon: ({focused}) => <TabBarIcon icon={images.search} focused={focused} title={"Search"} />
                    }
                }
            />
            <Tabs.Screen
                name={"cart"}
                options={
                    {
                        title: "Cart",
                       tabBarIcon: ({focused}) => <TabBarIcon icon={images.bag} focused={focused} title={"Cart"} />
                    }
                }
            />
            <Tabs.Screen
                name={"profile"}
                options={
                    {
                        title: "Profile",
                        tabBarIcon: ({focused}) => <TabBarIcon icon={images.person} focused={focused} title={"Profile"} />
                    }
                }
            />
        </Tabs>
    )
}
export default TabsLayout;
