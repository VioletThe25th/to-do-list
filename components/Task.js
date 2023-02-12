import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button, Checkbox } from 'react-native-paper';

function Task(props){
    const [checked, setChecked] = React.useState(false);

    return(
        <View style={styles.List}>
            <View style={styles.ListLeft}>
                <Checkbox style={styles.Checkbox}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Text style={styles.ListText}>{props.text}</Text>
            </View>
            <Button onPress={props.onPress} style={styles.Delete} icon={({ size, color }) => (
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
        maxWidth: '80%',
    }
})

export {Task};