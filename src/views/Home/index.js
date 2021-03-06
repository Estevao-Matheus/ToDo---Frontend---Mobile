import React,{useState, useEffect} from 'react';
import {View,Text, TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import styles from './styles'

//Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

//API
import api from '../../services/api'
import { fil } from 'date-fns/locale';

export default function Home(){
   const [filter,setFilter]= useState('today');
   const [tasks,setTasks] = useState([]);
   const [load,setLoad] = useState(false)
   const [latecount,setLatecount] = useState();

   async function loadTasks(){
      setLoad(true);
      await api.get(`/task/filter/${filter}/00:1B:44:11:3A:B7`)
      .then(response=> {
         setTasks(response.data)
      });
      setLoad(false);


   }
   async function lateVerify(){
      await api.get(`/task/filter/late/00:1B:44:11:3A:B7`)
      .then(response=> {
         setLatecount(response.data.length)
      });
      

   }

   function Notification(){
      setFilter('late');
   }
   useEffect(() =>{
      loadTasks();
      lateVerify();
   },[filter])

   return (
     <View style={styles.container}>  
       <Header showNotification={true} showBack={false} pressNotifiction={Notification} late={latecount}/>
       <View style ={styles.filter}>
          <TouchableOpacity onPress={() =>setFilter('all')}>
             <Text style={filter == 'all'? styles.filterTextActived : styles.filterTextInative}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>setFilter('today')}>
             <Text style={filter == 'today'? styles.filterTextActived : styles.filterTextInative}>Hoje</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>setFilter('month')}>
             <Text style={filter == 'month'? styles.filterTextActived : styles.filterTextInative}>Mês</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>setFilter('week')}>
             <Text style={filter == 'week'? styles.filterTextActived : styles.filterTextInative}>Semana</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>setFilter('year')}>
             <Text style={filter == 'year'? styles.filterTextActived : styles.filterTextInative}>Ano</Text>
          </TouchableOpacity>

       </View>
         <View style={styles.title}>
            <Text style={styles.titleText}>TAREFAS{ filter == 'late' && ' ATRASADAS'}</Text>
         </View>
       <ScrollView style={styles.content} contentContainerStyle={{alignItems: 'center'}}>
          
         {
            load
            ?
            <ActivityIndicator color='#EE6B26' size={50}/>
            :
            tasks.map(t =>
            (
            <TaskCard done={false} title={t.title} when={t.when} type={t.type}/>
            ))
         }  
        </ScrollView>

       <Footer icon={'add'}></Footer>
    </View>
   )



}