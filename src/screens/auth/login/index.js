import React, { useState } from 'react'

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
    Toast,
    ToastTitle,
    Pressable,
    Icon,
    CloseIcon,
    CheckIcon,
} from '@gluestack-ui/themed';
import { createToastHook } from "@gluestack-ui/toast"

// Supabase
import { supabase } from '../../../../config/supabase';

const useToast = createToastHook(Toast)

const Login = () => {
    const toast = useToast()
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const validate = () => {
        let valid = true;

        setErrors({
            email: '',
            password: '',
        });

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

        return valid;
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
        });
    };

    const handleSubmit = async () => {
        if (validate()) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (data.session && data.user) {
                navigation.navigate('MainTabNavigation');
                toast.show({
                    placement: 'top',
                    render: ({ id }) => {
                        return (
                            <Toast bg="$success700" nativeId={id} action="success" p="$3">
                                <Icon as={CheckIcon} color="$white" mt="$1" mr="$3" />
                                <VStack space="xs">
                                    <ToastTitle color="$textLight50">
                                        Login Successful
                                    </ToastTitle>
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
                                <Icon as={CheckIcon} color="$white" mt="$1" mr="$3" />
                                <VStack space="xs">
                                    <ToastTitle color="$textLight50">
                                        Login Failed
                                    </ToastTitle>
                                </VStack>
                                <Pressable mt="$1" onPress={() => toast.close(id)}>
                                    <Icon as={CloseIcon} color="$coolGray50" />
                                </Pressable>
                            </Toast>
                        )
                    }
                });
            }
            setLoading(false)
        }
    };

    return (
        <VStack flex={1} h="$80" space="md" p="$5" justifyContent="center">
            <Text color="$black" size="5xl" fontWeight="$bold" textAlign="center">
                Login
            </Text>

            <VStack space="md">
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

                <FormControl>
                    <Button size="md" variant="solid" action="primary" onPress={handleSubmit}>
                        {loading && <ButtonSpinner mr="$1" />}
                        <ButtonText>Login </ButtonText>
                    </Button>
                </FormControl>
            </VStack>

            <Button size="md" variant="link" onPress={() => navigation.navigate('RegisterScreen')}>
                <ButtonText>
                    Dont Have an Account? Register
                </ButtonText>
            </Button>
        </VStack>
    )
}

export default Login