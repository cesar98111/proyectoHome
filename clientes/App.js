import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as serviceUser from "./services/user.service"
import { useEffect } from 'react';
import Register from './components/pageLogin/Register';
import Home from './components/pages/Home';
import Login from './components/pageLogin/Login';
import SigIn from './components/pageLogin/SigIn';
import Logout from './components/pages/Logout';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store'
import * as ServiceTask  from "./services/task.service"
import Menu from './components/menu/Menu';
import Finances from './components/pages/Finances';
import ProductsList from './components/pages/ProductsList';
import GroupFinance from './components/pages/GroupFinance';
import AddProduct from './components/pages/AddProduct';
import Task from './components/pages/Task';
import AddTask from './components/pages/AddTask';

const Drawer = createDrawerNavigator()
const Key = "my-key"

export default function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [group,setGroup] = useState({})
  const [lists,setLists] = useState({})
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [list, setList] = useState([])
  //añadido task

  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState([])
  useEffect(()=>{

    const getUser= async() =>{
      const token= await SecureStore.getItemAsync(Key)
      console.log(user)
      if(token!== null){
        console.log("sda")
        const user=await serviceUser.currentUser(token)
        setUser(user)
        console.log(await serviceUser.currentUser(token))
        console.log(user.userID)
        const task = await ServiceTask.getTaskByUser(user.userID, token)
        setCurrentTask(task)
      }else{
        setUser(null)
      }
    }
    
    getUser()
  },[])
  

  const userLogin = async (credentials) =>{

    const token = await serviceUser.login(credentials)
    
    if(token === null){
      setError(!error)
    }else{
      console.log("ads"+token)
      await SecureStore.setItemAsync(Key, token)
      const currentUser=await serviceUser.currentUser(token)
      setUser(currentUser)
      const task = await ServiceTask.getTaskByUser(currentUser.userID, token)
      setCurrentTask(task)
    }
    
  
  }

  const userRegister = async (credentials) =>{
    const token =  await serviceUser.register(credentials)
    await SecureStore.setItemAsync(Key, token)
    const currentUser =await serviceUser.currentUser(await SecureStore.getItemAsync(Key))
    setUser(currentUser)
    const task = await ServiceTask.getTaskByUser(user.userID, token)
    setCurrentTask(task)
    return token
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home' drawerContent={(prop) => <Menu {...prop} setTasks={setTasks} user={user} setUsers={setUsers} />}>
          {
            user === null?
            <>
              <Drawer.Screen name="Login" component={Login}/>

              <Drawer.Screen name="Register">
                {()=> <Register  register={userRegister} />}
              </Drawer.Screen>
              <Drawer.Screen name="SigIn">
                {()=> <SigIn  login={userLogin} error={error} setError={setError}/>}
              </Drawer.Screen>
            </>
            
            :
            <>
              <Drawer.Screen name="Home">
                {()=> <Home user={user} setUser={setUser} tasks={currentTask}/>}
              </Drawer.Screen>
              <Drawer.Screen name="Logout">
                {()=><Logout setUser={setUser}/>}
              </Drawer.Screen>
              <Drawer.Screen name="GroupFinance">
                {()=><GroupFinance user={user} setGroup={setGroup} setLists={setLists} users={users} setUsers={setUsers}/>}
              </Drawer.Screen>
              <Drawer.Screen name="Products">
                {()=><ProductsList List={list} product={products} />}
              </Drawer.Screen>
              <Drawer.Screen name="Finances">
                {()=><Finances group={group} setLists={setLists} lists={lists} list={list} setList={setList} users={users} setProducts={setProducts}/>}
              </Drawer.Screen>
              <Drawer.Screen name="Añadir productos">
                {()=><AddProduct group={group} />}
              </Drawer.Screen>
              <Drawer.Screen name="Tareas">
                {()=><Task task={tasks}/>}
              </Drawer.Screen>
              <Drawer.Screen name = "Añadir Tareas">
                {()=><AddTask  user={user} setCurrentTask={setCurrentTask}/>}
              </Drawer.Screen>
            </>
            
          }
          
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
