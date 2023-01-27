import React from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Image, Text } from "react-native";
import { Button } from 'react-native-paper';


function PlusScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Button title="Go back" 
                    onPress={() => navigation.goBack()} 
                    style={styles.goBack} 
                    icon={({ size, color }) => (
                        <Image
                            source={require('../../assets/arrow-left-36.png')}
                            style={styles.goBack}
                        />
            )}></Button>
            <View style={styles.ListItem}>
                <Text style={styles.Title}>Add a new task</Text>
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
        backgroundColor: '#E2E8ED',
        paddingTop: 40,
    },
    Title: {
        fontWeight: "bold",
        fontSize: 30,
    },
    ListItem: {
        paddingTop: 40,
        marginLeft: 20,
        marginRight: 20,
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
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    TaskName: {

    },
})

export {PlusScreen};