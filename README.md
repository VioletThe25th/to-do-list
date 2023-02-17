# to-do-list
Project that we use to learn how to code a mobile app with React. The goal is to make a to-do-list.

# Task

At first, we created a `Task` component in order to create as many tasks as the user want.
The `Task` component will be called in many other ``screen component``, as `HomeScreen` for instance.

## Task details

1. Checkbox
2. Title
3. Details (of the task)
4. delete button

### Checkbox

The ``task`` has a ``checkbox`` to confirm the validation of the `task`. The one we used is the `checkbox` from `react-native-paper`.

```javaScript
<Checkbox status={checked ? 'checked' : 'unchecked'} 
	                onPress={handlePress}/>
```

the checkbox call the `handlePress` function. This function use the ``useState`` function to update the state of the `checkbox`.  
We use the `AsyncStorage` library to save the `modifyTask` with the `setItem` method. 
The `setItem` method wants a ``key`` as first argument and the value in `JSON` as second argument. As ``updatedTask`` is  an object and not a `JSON`, we use the `JSON.stringify()` method. 

```javaScript
const [checked, setChecked] = useState(task.state);
    const handlePress = async () => {
        setChecked(!checked);
        try {
            const updatedTask = task;
            updatedTask.state = !checked;
            await AsyncStorage.setItem(`task-${task.id}`, JSON.stringify(updatedTask));
        } catch (error) {
            console.clear();
            console.log(error);
        }
    }
```


### Title

The task has a ``title`` that we call in a `TouchableOpacity`, to open the `TaskScreen`, as we will see later.
It has a `Text` tag where we retrieve the ``task.name``, and if it doesn't have any name, we use `Tâche` as default.

```javaScript
{/* Open the screen to change title and / or details */}
	<TouchableOpacity style={styles.ListText} onPress={() => {
		navigation.navigate("TaskScreen", { task: task });
		}}>
		<Text style={styles.ListText}>
			{task.name ? task.name : "Tâche"}
		</Text>
	</TouchableOpacity>
```

### Details

The details work the same way as the Title.

```javaScript
<TouchableOpacity style={styles.ListText} onPress={() => {
	navigation.navigate("TaskScreen", { task: task });
	}}>
	<Text style={styles.ListDetails}>
		{task.details ? task.details : "description"}
	</Text>
</TouchableOpacity>
```

### Delete button

The delete button uses an icon we put in our `asset` folder, and open the `deleteTask` function when we press it.

```javaScript
<Button onPress={deleteTask} style={styles.Delete} 
	icon={({ size, color }) => (
		<Image
			source={require('../assets/delete-24.png')}
			style={styles.Delete}
		/>
)}></Button>
```

The `deleteTask` function uses the `AsyncStorage.removeItem` method to remove the `task`.
1. We remove the task we clicked on
2. We retrieve the ids of all the tasks
3. We check the ``tasksIds``, and we take all the `ids` of the `task` except the one we deleted
4. The `setItem` method save the ``newIds`` in the ``tasksIds`` 

So we erase the task and return the tasks but without the one we deleted.

```javaScript
const deleteTask = async () => {
        try {
            await AsyncStorage.removeItem(`task-${task.id}`);
			const ids = JSON.parse(await AsyncStorage.getItem('tasksIds'));
			const newIds = ids.filter(id => id !== task.id);
			await AsyncStorage.setItem('tasksIds', JSON.stringify(newIds));
			navigation.navigate('HomeScreen', { 'task.id': task });    
        } catch (error) {
            console.clear();
            console.log(error);
        }
    }
```

# Screens

We have many screens in the project, there can be seen in the `screens` folder. We call them in the `App.js` file, with 2 libraries:

1. `NavigationContainer`
2. `createNativeStackNavigator`

We call our screens in the project that way, where `stack` is the `createNativeStackNavigator` function:

```javaScript
<NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PlusScreen" component={PlusScreen} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} />
      </Stack.Navigator>
</NavigationContainer>
```

## HomeScreen

The `HomeScreen` is the main screen of the App. We can see :
1. The button that opens the `PlusScreen` screen
2. The tasks the user has created (and a text that say that no task have been created if not)
3. functions to save the ``tasks`` and put new `tasks` in the array

### Button "+"

the button opens the `PlusScreen` screen

```javaScript
<FAB
	mode="flat"
	size="medium"
	icon="plus"
	onPress={() => navigation.navigate('PlusScreen', {tasks: tasks, tasksIds: tasksIds})}
	style={[
	styles.fab,
	{ top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
	]}
/>
```

### The tasks

We use the `map` method to render the `tasks` list. We put the key of the `tasks` : task.id

```javaScript
{
	tasks.map((task) => {
		return  <Task key ={task.id} task = {task} navigation={navigation}/>
	})
}
```

### Functions

#### Save the tasks

We pass a function in the ``useEffect`` that use the `AsyncStorage.getItem` method to retrieve all the tasks stored. If there are no tasks, the array is set to ``null``.

```javaScript
// get already stocked tasks when the page is load up or when the navigation / routes changes
useEffect(() => {
	async function fetchData() {
		try {
			const jsonValue = await AsyncStorage.getItem('tasksIds')
			jsonValue != null ? setTasksIds(JSON.parse(jsonValue)) : null;
		} catch (error)  {
			console.log(error);
		}
	}
	fetchData();
}, [navigation, route])
```

#### Save new tasks

We use `useEffect` to crate a function that will :
1. If a task is created, we initialize an array `newTasks`
2. We check all the tasks in `tasksIds` and store them in `jsonValue`
3. We push `jsonValue` in our array `newTasks`
4. If `newTasks` and `tasksIds` are the same size, we pass `newTasks` as our new tasks

```javaScript
// Put new Tasks in the state
useEffect(() => {
	try {
		if (tasksIds.length > 0) {
			const newTasks = [];
			tasksIds.forEach(async (id) => {
				const jsonValue = await AsyncStorage.getItem(`task-${id}`)
				newTasks.push(JSON.parse(jsonValue));
				if (newTasks.length === tasksIds.length) {
					setTasks(newTasks);
				}
			})
		}
	} catch (error) {
		console.log(error);
	}
}, [tasksIds])
```


## PlusScreen

The `PlusScreen` screen has texts inputs to name and details the task we want to create and a button to save the new task

### Texts input

the `text input` are in a ``KeyboardAvoidingView``. This component will automatically adjust its height, position, or bottom padding based on the keyboard height to remain visible while the virtual keyboard is displayed.

The `text input` will use the `useState` function `setName` or `setDetails`. 

```javaScript
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
	style={styles.TaskWrapper}>
		
		<TextInput styles={styles.TaskName} placeholder={'Task Name'} onChangeText={setName} value={name}></TextInput>
</KeyboardAvoidingView>

<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
	style={styles.TaskWrapper}>
		
		<TextInput styles={styles.TaskName} placeholder={'Task Description'} onChangeText={setDetails} value={details}></TextInput>
</KeyboardAvoidingView>
```

### Saving the new task

#### Button to save the task

To save a the new task, we use the same button as we did in `HomeScreen`, we call the `saveTask` function when we press the button.

```javaScript
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
```

#### saveTask function

1. Create a variable `newId` that increment itself if there are already stocked ``tasks`` and put 0 if not
2. Create a variable `updatedIds` that takes all the already stocked ids
3. Crate an object `newTask` that has many parameters
4. We use the `AsyncStorage.setitem` method to put our `updatedIds` into `tasksIds`
5. We use the same method to set the `task` we created in the `newTask` object
6. We return to the ``HomeScreen`` screen and return the `updatedIds`

```javaScript
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

	} catch (error) {
		console.clear();
		console.log(error);
		setError(error);
	}
}
```


## TaskScreen

The `TaskScreen` screen is used whenever the user touch the `title` or the `details` of the `task` in the `HomeScreen` screen. 

```javaScript
navigation.navigate("TaskScreen", { task: task });
```

We retrieve the task we clicked on, it will be useful to save the task we are editing.

```javaScript
const { task } = route.params;

const [name, setName] = useState(task.name);
const [details, setDetails] = useState(task.details);
```

### Texts Input

The `TaskScreen` screen has 2 `TextInput` to modify the `task.name` and the `task.details`. To see the name and the details of the task we want to modify, we put a `value={name/details}`.

```javaScript
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
	style={styles.TaskWrapper}>
		<
		TextInput styles={styles.TaskName} onChangeText={setName} value={name}/>
</KeyboardAvoidingView>

<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
	style={styles.TaskWrapper}>
		
		<TextInput styles={styles.TaskName} onChangeText={setDetails} value={details}/>
</KeyboardAvoidingView>
```

### Modify task

we have a function that is used to modify the task, we call it in a ``button`` 

```javaScript
<Button style={styles.Title} title="Save"
	onPress={modifyTask}>
		Save
</Button>
```

The function works the same way as `saveTask` in the `PlusScreen` screen. 

```javaScript
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
		
	} catch (error) {
		console.clear();
		console.log(error);
		setError(error);
	}
}
```
