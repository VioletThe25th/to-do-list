import React, { useEffect,useState } from "react";
import { StyleSheet, Alert, Button, View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../Task';
import { PlusScreen } from './PlusScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

function HomeScreen({navigation}){
    const [tasks, setTasks] = useState([]);

    const getData = async () => {
        try {
            await AsyncStorage.getItem("tasks").then(data =>setTasks(JSON.parse(data)) ) 
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        getData();
    }, [tasks])

    const completeTask = (index) => {
        return Alert.alert(
        "Alert Title",
        "Are you sure you want to delete this task?",
        [
            {
                text: "Yes",
                onPress: () => {
                var itemsCopy = [...tasks];
                itemsCopy.splice(index, 1);
                setTasks(itemsCopy);
                storeData(itemsCopy);
                },
            },
            {
                text: "No",
            }
        ]);
    }

    const storeData = async (itemsCopy) => {
        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(itemsCopy));
            console.log('All tasks', JSON.stringify(itemsCopy));
        } catch (e) {
            console.log(e)
        }
    }

    return(
        // To do list
        <View style={styles.container}>
            <View style={styles.toDoList}>
                <Text style={styles.Title}>To Do List</Text>
                <FAB
                    mode="flat"
                    size="medium"
                    icon="plus"
                    onPress={() => navigation.navigate('PlusScreen')}
                    style={[
                    styles.fab,
                    { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
                    ]}
                />
                {/* List of differents tasks */}
                <View style={styles.List}>
                    {
                            tasks.map((item, index) => {
                            return  <Task key ={index} text = {item} onPress={() => completeTask(index)}/>
                        })
                    }
                    {/* <Task text='Task 1'></Task>
                    <Task text='Task 2'></Task>*/}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#E2E8ED'
    },
    toDoList: {
        paddingTop: 80,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    Title: {
        fontWeight: "bold",
        fontSize: 30,
    },
    List: {
        marginTop: 30,
    },
    bottom: {
        backgroundColor: 'aquamarine',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: 'absolute',
        right: 20,
        marginTop: 60,
        backgroundColor: '#fff'
    },
})

export {HomeScreen};