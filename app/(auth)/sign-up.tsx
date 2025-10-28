import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })

    const submit = async () => {
        const {name,password,email} = form;

        if(!name || !email || !password) return Alert.alert('Error','Please enter a valid email and password')

            setIsSubmitting(true);
        
            try {
                const res = await createUser({name, email ,password })
                console.log(res)
                router.replace('/');
            } catch (error) {
                throw new Error(error as string);
            }finally {
                setIsSubmitting(false)
            }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            <CustomInput 
            label={"Full name"} 
            value={form.name}  
            onChangeText={(text) => {setForm((prev) => ({...prev, name: text}))}}
            placeholder={"Enter your full name"}/>

            <CustomInput 
            label={"Email"} 
            value={form.email} 
            keyboardType={"email-address"} 
            onChangeText={(text) => {setForm((prev) => ({...prev, email: text}))}} 
            placeholder={"Enter your email"}/>
                        
            <CustomInput 
            label={"Password"} 
            value={form.password} 
            keyboardType={"default"} 
            onChangeText={(text) => {setForm((prev) => ({...prev, password: text}))}} 
            placeholder={"Enter your password"}/>

            <CustomButton title= "Sign Up" isLoading={isSubmitting} onPress={submit}/>

            <View className="flex justify-center mt-5 flex-row gap-2 ">
                <Text className="base-regular text-gray-100">Already have an account?</Text>
                <Link href={"/(auth)/sign-in"} className="base-bold text-primary">Sign in</Link>
            </View>
        </View>
    )
}
export default SignUp
