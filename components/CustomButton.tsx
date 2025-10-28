import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import cn from "clsx";
import {CustomButtonProps} from "@/type";

const CustomButton = ({style,
                      onPress, title, textStyle, isLoading}: CustomButtonProps) => {

    return (
        <TouchableOpacity className={cn('custom-btn',style ) } onPress={onPress}>
            <View>
                {
                    isLoading ? (
                        <ActivityIndicator size={"small"} color={"white"}/>
                    ): (
                        <Text className={cn('text-white-100 paragraph-semibold',textStyle)}>{title}</Text>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton
