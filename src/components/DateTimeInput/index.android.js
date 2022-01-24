import React, {useState} from 'react';
import {TouchableOpacity,Image,TextInput,Touchable, StyleSheet,View,Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';
import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimeInputAndroid({type}){
    const [datetime,setDateTime] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState();

    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };
    
      return (
        <View>
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={datetime}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      )
    
   
   /* return(
        <TouchableOpacity onPress={showDatepicker}>
        <TextInput style={styles.input} placeholder={type == 'date'? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...'} editable={false} value={datetime}/>
        {show && (   
          <DateTimePicker
          testID="dateTimePicker"
          value={datetime}
          mode={mode}
          is24Hour={true}
          display="default"
          //onChange={setDateTime}
          minimumDate={new Date}
        />
        )}
        <Image
        style={styles.iconTextInput}
        source= {type =='date' ? iconCalendar : iconClock}/>
         
        </TouchableOpacity>
      
    )*/
}