import React, { useEffect,useState } from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Image, Text } from "react-native";
import { Button } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

function PlusScreen({navigation, route} ) {

    //console.log(route.params.tasksIds)

    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [error, setError] = useState("");

    const saveTask = async () => {
        try {
            const newId = route.params.tasks.length > 0 ? route.params.tasks[route.params.tasks.length - 1].id + 1 : 0;
            const updatedIds = [...route.params.tasksIds, newId];
            const newTask = {
                id: newId,
                name: name,
                details: details,
                state: false,
            };

            await AsyncStorage.setItem('tasksIds', JSON.stringify(updatedIds));
            await AsyncStorage.setItem(`task-${newId}`, JSON.stringify(newTask));
            navigation.navigate('HomeScreen', {ids: updatedIds});
            //console.log(newTask)
            //console.log(route.params.updatedIds)

        } catch (error) {
            console.clear();
            console.log(error);
            setError(error);
        }
    }

    /*
    const getData = async (itemList) => {
        try {
            await AsyncStorage.multiGet(itemList.text, )
            //await AsyncStorage.getItem("tasks").then(data =>setTask(JSON.parse(data)))
        } catch(e) {
            console.log(e);
        }
    }

    const handleAddTask = () => {
        Keyboard.dismiss();
        if(!task.trim()) {
            alert('Enter Task');
            return;
        }
        navigation.navigate('HomeScreen');
        //alert('Success');
        taskItems?.push(task);
        storeData(taskItems);
    }

    const storeData = async (item) => {
        try {
            await AsyncStorage.setItem(item.task.id, JSON.stringify(item));
            console.log('Stored tasks', JSON.stringify(item));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        getData();
    }, [taskItems])

    */

    return(
        <View style={styles.container}>
            <Button title="Go back" 
                    onPress={() => navigation.navigate('HomeScreen')} 
                    style={styles.goBack} 
                    icon={({ size, color }) => (
                        <Image
                            source={require('../../assets/arrow-left-36.png')}
                            style={styles.goBack}
                        />
            )}></Button>
            <View style={styles.ListItem}>
                <Text style={styles.Title}>Add a new task</Text>
                <FAB
                    mode="flat"
                    size="medium"
                    icon="plus"
                    onPress = {() => saveTask()}
                    style={[
                    styles.fab,
                    { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
                    ]}
                />
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.TaskWrapper}
                    >
                        <TextInput styles={styles.TaskName} placeholder={'Task Name'} onChangeText={setName} value={name}></TextInput>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.TaskWrapper}
                    >
                        <TextInput styles={styles.TaskName} placeholder={'Task Description'} onChangeText={setDetails} value={details}></TextInput>
                </KeyboardAvoidingView>
            </View>
            {error ? <Text>{error.toString()}</Text> : null}
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
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20,
        //justifyContent: 'space-between',
    },
    goBack: {
        alignItems: 'flex-start',
        //backgroundColor: '#fff',

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
    fab: {
        position: 'absolute',
        right: 20,
        backgroundColor: '#fff',
    },
    TaskName: {
        
    },
})

export {PlusScreen};