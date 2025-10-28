import {View, Text, TextInput} from 'react-native'
import React from 'react'
import {CustomInputProps} from "@/type";
import cn from "clsx";

const CustomInput = ({
    placeholder = 'Enter a text',
    label,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
                     }:CustomInputProps) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
        <View className={"w-full"}>
            <Text className={"label"}>{label}</Text>
            <TextInput
                autoCapitalize={"none"}
                autoCorrect={false}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                onFocus={() => {setIsFocused(true)}}
                onBlur={() => {setIsFocused(true)}}
                placeholderTextColor={"#888"}
                className={cn('input', isFocused ? 'border-primary':'border-gray-300')}
            />
        </View>
    )
}
export default CustomInput
