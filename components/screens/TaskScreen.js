import React, {useState} from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Image, Text } from "react-native";
import { Button } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

function TaskScreen({navigation, route} ) {

    const { task } = route.params;

    const [name, setName] = useState(task.name);
    const [details, setDetails] = useState(task.details);
    const [error, setError] = useState("");


    //function that modify the task
    const modifyTask = async () => {
        try {
            const modifiedTask = {
                id: task.id,
                name: name,
                details: details,
                state: task.state,
            };
            await AsyncStorage.setItem(`task-${task.id}`, JSON.stringify(modifiedTask));
            navigation.navigate('HomeScreen', {'task.id': modifiedTask});
            console.log(modifiedTask)

        } catch (error) {
            console.clear();
            console.log(error);
            setError(error);
        }
    }

    return(
        <View style={styles.container}>

            <View style={styles.ListItem}>
                <Button title="Go back" 
                        onPress={() => navigation.navigate('HomeScreen')} 
                        style={styles.goBack} 
                        icon={({ size, color }) => (
                            <Image
                                source={require('../../assets/arrow-left-36.png')}
                                style={styles.goBack}
                            />
                )}></Button>

                <Text style={styles.Title}>Modify Task</Text>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.TaskWrapper}
                    >
                        <TextInput styles={styles.TaskName} onChangeText={setName} value={name}></TextInput>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.TaskWrapper}
                    >
                        <TextInput styles={styles.TaskName} onChangeText={setDetails} value={details}></TextInput>
                </KeyboardAvoidingView>

                <Button style={styles.SaveTask} title="Save"
                    onPress={modifyTask}
                >Save</Button>
                {error ? <Text>{error.toString()}</Text> : null}
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
    goBack: {
        alignItems: 'flex-start',
    },
    Title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "black"
    },
    ListItem: {
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    TaskWrapper: {
        width: '70%',
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
    SaveTask: {
        fontWeight: "bold",
        fontSize: 30,
        color: "black",
        marginTop: 20,
        backgroundColor: "white"
    }
})

export {TaskScreen};