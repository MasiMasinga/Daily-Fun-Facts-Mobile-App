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
    AlertCircleIcon
} from '@gluestack-ui/themed';


const Login = () => {
    const navigation = useNavigation();
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

    const handleSubmit = () => {
        if (validate()) {
            navigation.navigate('MainTabNavigation');
            resetForm();
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