import React, { useState, useEffect } from 'react'

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
    AlertCircleIcon
} from '@gluestack-ui/themed';

// Api
import AuthService from '../../../services/auth/auth.service';


const Register = () => {
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

    const handleSubmit = () => {
        if (validate()) {
            navigation.navigate('LoginScreen');
            resetForm();
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