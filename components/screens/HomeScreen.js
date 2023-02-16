import React, { useEffect,useState } from "react";
import { StyleSheet, Alert, View, Text, ScrollView } from 'react-native';
import { Task } from '../Task';
import { FAB } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

function HomeScreen({navigation}){
    const [tasks, setTasks] = useState([]);
    
    const getData = async (itemList) => {
        try {
            //await AsyncStorage.multiGet(itemList.text, )
            await AsyncStorage.getItem("tasks").then(data =>setTasks(JSON.parse(data)))
        } catch(e) {
            console.log(e);
        }
    }

    const removeData = async (item) => {
        try {
            await AsyncStorage.removeItem(item.text, JSON.stringify(item));
            console.log('All tasks', JSON.stringify(item));
        } catch (e) {
            console.log(e)
        }
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
    }, [tasks])

    const deleteTask = (index) => {
        return Alert.alert(
        "Alert Title",
        "Are you sure you want to delete this task?",
        [
            {
                text: "Yes",
                onPress: () => {
                    // var itemsCopy = [...tasks];
                    // itemsCopy.splice(index, 1);
                    // setTasks(itemsCopy);
                    removeData(tasks[index]);
                },
            },
            {
                text: "No",
            }
        ]);
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
                {!tasks?.length ? 
                (
                    <View> 
                        <Text>Aucune tâche pour l'instant</Text>
                    </View> 
                ): (
                    <ScrollView>
                        <View style={styles.List}>
                        {
                                tasks.map((item, index) => {
                                return  <Task key ={index} text = {item} onPress={() => deleteTask(index)}/>
                            })
                        }
                        {/* <Task text='Task 1'></Task>
                        <Task text='Task 2'></Task>*/}
                        </View>
                    </ScrollView>
)}
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
        marginBottom: 30,
    },
    List: {
        marginBottom: 70,
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