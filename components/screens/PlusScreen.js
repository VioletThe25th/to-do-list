import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useEffect,useState } from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Image, Text, Keyboard } from "react-native";
import { Button } from 'react-native-paper';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {HomeScreen} from './index';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

function PlusScreen({navigation} ) {
    const [task, setTask] = useState("");
    const [taskItems, setTaskItems] = useState([]);

    const getData = async (itemList) => {
        try {
            //await AsyncStorage.multiGet(itemList.text, )
            await AsyncStorage.getItem("tasks").then(data =>setTasks(JSON.parse(data)))
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
            await AsyncStorage.setItem(item.text, JSON.stringify(item));
            console.log('Stored tasks', JSON.stringify(item));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        getData();
    }, [taskItems])

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
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.TaskWrapper}
                    >
                        <TextInput styles={styles.TaskName} placeholder={'Task Name'} value= {task}onChangeText={text => setTask(text)}></TextInput>
                </KeyboardAvoidingView>
                <FAB
                    mode="flat"
                    size="medium"
                    icon="plus"
                    onPress = {() => handleAddTask()}
                    style={[
                    styles.fab,
                    { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
                    ]}
                />
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
        marginTop: 70,
        backgroundColor: '#fff'
    },
    TaskName: {
        
    },
})

export {PlusScreen};