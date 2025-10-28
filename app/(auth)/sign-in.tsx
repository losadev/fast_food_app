import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import {signIn} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const submit = async () => {
        const {email, password} = form;
        if(!email || !password) return Alert.alert('Error','Please enter a valida email and password')

            setIsSubmitting(true);
        
            try {
                // Call appwrite Sign in function
                await signIn({email, password});
                router.replace('/');
            } catch (error: any) {
                Sentry.captureEvent(error);
            }finally {
                setIsSubmitting(false)
            }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

            <CustomInput 
            label={"Email"} 
            value={form.email} 
            keyboardType={"email-address"} 
            onChangeText={(text) => {setForm((prev) => ({...prev, email: text}))}} 
            placeholder={"Enter your email"}/>
                        
            <CustomInput 
            label={"Password"} 
            value={form.password} 
            onChangeText={(text) => {setForm((prev) => ({...prev, password: text}))}} 
            placeholder={"Enter your password"}/>

            <CustomButton title= "Sign In" isLoading={isSubmitting} onPress={submit}/>

            <View className="flex justify-center mt-5 flex-row gap-2 ">
                <Text className="base-regular text-gray-100">Don't have an account?</Text>
                <Link href={"/(auth)/sign-up"} className="base-bold text-primary">Sign Up</Link>
            </View>
        </View>
    )
}
export default SignIn
