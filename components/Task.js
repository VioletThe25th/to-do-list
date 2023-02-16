import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Button, Checkbox } from 'react-native-paper';

function Task({navigation, task}){
    const [checked, setChecked] = useState(task.state);

    /*

    const storeData = async (index) => {
        try {
            await AsyncStorage.setItem();
        } catch (e) {
            console.log(e)
        }
    }

    */

    const handlePress = async () => {
        setChecked(!checked);

        try {
            const updatedTask = task;
            updatedTask.state = !checked;
            // if (task.doneDate) {
            //     updatedTask.donedate = new Date().toJSON().slice(0, 10);
            //     await AsyncStorage.setItem(`dailyTask-${task.id}`, JSON.stringify(updatedTask));
            // } else {
            //     await AsyncStorage.setItem(`task-${task.id}`, JSON.stringify(updatedTask));
            // }
            await AsyncStorage.setItem(`task-${task.id}`, JSON.stringify(updatedTask));
        } catch (error) {
            console.clear();
            console.log(error);
        }
        console.log(task.state)
    }

    const deleteTask = async () => {
        try {
            await AsyncStorage.removeItem(`task-${task.id}`);
                const ids = JSON.parse(await AsyncStorage.getItem('tasksIds'));
                const newIds = ids.filter(id => id !== task.id);
                await AsyncStorage.setItem('tasksIds', JSON.stringify(newIds));
                navigation.navigate('HomeScreen', { 'task.id': task });
                if (newIds == 0) {
                    await AsyncStorage.removeItem(`task-${task.id}`);
                }
                /*
            if (task.doneDate) {
                await AsyncStorage.removeItem(`dailyTask-${task.id}`);
                const ids = JSON.parse(await AsyncStorage.getItem('dailyTasksIds'));
                const newIds = ids.filter(id => id !== task.id);
                await AsyncStorage.setItem('dailyTasksIds', JSON.stringify(newIds));
                navigation.navigate('DailyScreen', { 'task.id': task });
            }
            else {
                await AsyncStorage.removeItem(`task-${task.id}`);
                const ids = JSON.parse(await AsyncStorage.getItem('tasksIds'));
                const newIds = ids.filter(id => id !== task.id);
                await AsyncStorage.setItem('tasksIds', JSON.stringify(newIds));
                navigation.navigate('HomeScreen', { 'task.id': task });
                if (newIds == 0) {
                    await AsyncStorage.removeItem(`task-${task.id}`);
                }
            }
            */
        } catch (error) {
            console.clear();
            console.log(error);
        }
    }

    // console.log(task)

    return(
        <View style={styles.List}>
            <View style={styles.ListLeft}>
                <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={handlePress}/>

                {/* Open the screen to change title and / or details */}
                <TouchableOpacity style={styles.ListText} onPress={() => {
                    navigation.navigate("TaskScreen", { task: task });
                    }}>
                    <Text style={styles.ListText}>{task.name ? task.name : "Tâche"}</Text>
                </TouchableOpacity>
            </View>

            {/* Open the screen to change title and / or details */}
            <View>
            <TouchableOpacity style={styles.ListText} onPress={() => {
                    navigation.navigate("TaskScreen", { task: task });
                    }}>
                    <Text style={styles.ListDetails}>{task.details ? task.details : "description"}</Text>
                </TouchableOpacity>
            </View>

            <Button onPress={deleteTask} style={styles.Delete} icon={({ size, color }) => (
                    <Image
                        source={require('../assets/delete-24.png')}
                        style={styles.Delete}
                    />
            )}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    List: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        Shadow: 230,
        width: '100%',
    },
    ListLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    Checkbox: {
        
    },
    Delete: {
        tintColor: 'grey',
        width: 24,
        height: 24,
    },
    ListText: {
        maxWidth: '100%',
    },
    ListDetails: {
        fontSize: 10,
        color: "grey",
    }
})

export {Task};