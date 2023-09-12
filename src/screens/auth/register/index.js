import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

// React Navigation
import { useNavigation } from '@react-navigation/native';

// Gluestack UI
import {
    VStack,
    Text,
    Button,
    ButtonText,
    FormControl,
    FormControlLabel,
    Input,
    InputField,
    FormControlLabelText,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    AlertCircleIcon,
    ButtonSpinner,
    Toast,
    ToastTitle,
    ToastDescription,
    Pressable,
    Icon,
    CloseIcon,
    CheckIcon,
    AlertTriangleIcon
} from '@gluestack-ui/themed';

import { createToastHook } from "@gluestack-ui/toast"

// Supabase
import { supabase } from '../../../../config/supabase';

const useToast = createToastHook(Toast)

const Register = () => {
    const toast = useToast()
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let valid = true;

        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        if (!formData.name) {
            setErrors(prevErrors => ({
                ...prevErrors,
                name: 'Name is required.'
            }));
            valid = false;
        } else if (formData.name.length < 6) {
            setErrors(prevErrors => ({
                ...prevErrors,
                name: 'At least 6 characters are required for the name.'
            }));
            valid = false;
        }

        if (!formData.email) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Email is required.'
            }));
            valid = false;
        } else if (!formData.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Email is invalid.'
            }));
            valid = false;
        }

        if (!formData.password) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: 'Password is required.'
            }));
            valid = false;
        } else if (formData.password.length < 6) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: 'At least 6 characters are required for the password.'
            }));
            valid = false;
        }

        if (!formData.confirmPassword) {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: 'Confirm Password is required.'
            }));
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: 'Password and Confirm Password must match.'
            }));
            valid = false;
        }

        return valid;
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleSubmit = async () => {
        if (validate()) {
            setLoading(true)
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password
            });
            if (data) {
                navigation.navigate('LoginScreen');
                toast.show({
                    placement: 'top',
                    render: ({ id }) => {
                        return (
                            <Toast bg="$success700" nativeId={id} action="success" p="$3">
                                <Icon as={CheckIcon} color="$white" mt="$1" mr="$3" />
                                <VStack space="xs">
                                    <ToastTitle color="$textLight50">
                                        Registration Successful
                                    </ToastTitle>
                                    <ToastDescription color="$textLight50">
                                        You can now login to your account.
                                    </ToastDescription>
                                </VStack>
                                <Pressable mt="$1" onPress={() => toast.close(id)}>
                                    <Icon as={CloseIcon} color="$coolGray50" />
                                </Pressable>
                            </Toast>
                        )
                    }
                });
                resetForm();
            } else {
                toast.show({
                    placement: 'top',
                    render: ({ id }) => {
                        return (
                            <Toast bg="$error700" nativeId={id} action="error" p="$3">
                                <Icon as={AlertTriangleIcon} color="$white" mt="$1" mr="$3" />
                                <VStack space="xs">
                                    <ToastTitle color="$textLight50">
                                        Registration Failed
                                    </ToastTitle>
                                    <ToastDescription color="$textLight50">
                                        {error}
                                    </ToastDescription>
                                </VStack>
                                <Pressable mt="$1" onPress={() => toast.close(id)}>
                                    <Icon as={CloseIcon} color="$coolGray50" />
                                </Pressable>
                            </Toast>
                        )
                    }
                })
            }
            setLoading(false)
        }
    };

    return (
        <VStack flex={1} h="$80" space="lg" p="$5" justifyContent="center">
            <Text color="$black" size="5xl" fontWeight="$bold" textAlign="center">
                Register
            </Text>

            <VStack space="md">
                <FormControl size="md" isRequired isInvalid={errors.name}>
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>Name</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg">
                        <InputField
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChangeText={text => setFormData({ ...formData, name: text })}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                            {errors.name}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl size="md" isRequired isInvalid={errors.email} >
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg">
                        <InputField
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={text => setFormData({ ...formData, email: text })}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                            {errors.email}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl size="md" isRequired isInvalid={errors.password} >
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg">
                        <InputField
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChangeText={text => setFormData({ ...formData, password: text })}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                            {errors.password}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl size="md" isRequired isInvalid={errors.confirmPassword} >
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>Confirm Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg">
                        <InputField
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChangeText={text => setFormData({ ...formData, confirmPassword: text })}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                            {errors.confirmPassword}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl>
                    <Button size="md" variant="solid" action="primary" onPress={handleSubmit}>
                        {loading && <ButtonSpinner mr="$1" />}
                        <ButtonText>Register </ButtonText>
                    </Button>
                </FormControl>
            </VStack>

            <Button size="md" variant="link" onPress={() => navigation.navigate('LoginScreen')}>
                <ButtonText>
                    Already Have an Account? Login
                </ButtonText>
            </Button>
        </VStack>
    )
}

export default Register