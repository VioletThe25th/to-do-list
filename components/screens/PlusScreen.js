import React from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, FAB, useTheme, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function PlusScreen({navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.ListItem}>
                <Button title="Go back" 
                    onPress={() => navigation.goBack()} 
                    style={styles.goBack} 
                    icon={({ size, color }) => (
                        <Image
                            source={require('../../assets/arrow-left-36.png')}
                            style={styles.goBack}
                        />
                )}></Button>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.TaskWrapper}
                    >
                        <TextInput styles={styles.TaskName} placeholder={'Task Name'}></TextInput>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E8ED'
    },
    ListItem: {
        paddingTop: 40,
        //justifyContent: 'space-between',
    },
    goBack: {
        alignItems: 'flex-start',
        //backgroundColor: '#fff',

    },
    TaskWrapper: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        borderRadius: 60,
        marginTop: 20,
    },
    TaskName: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
    },
})

export {PlusScreen};