import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert, ToastAndroid } from 'react-native';

const Edit = ({navigation, route}) => {
  const[name,setName] = useState(route.params.name);
  const[pic,setPic] = useState(route.params.pic);
  return (
    <View>
      <StatusBar/>
      <Text>Card Name:</Text>
      <TextInput value={name} style={{borderWidth:1}} onChangeText={(text)=>setName(text)}/>
      <Text>Card Pic URL:</Text>
      <TextInput value={pic} style={{borderWidth:1}} onChangeText={(text)=>setPic(text)}/>
      <Text> </Text>
      <Button title='Update'
      onPress={()=>{
          fetch("http://onlinecardappwebservice-y487.onrender.com/updatecard/"+route.params.id,
              {
                  method:"PUT",
                  headers:{
                      "Content-Type":"application/json",
                  },
                  body:JSON.stringify({
                      card_name: name,
                      card_pic: pic,
                  }),
              }
          )
              .then((response)=>response.json())
              .then(()=>{
                  navigation.navigate("Home");
              })
              .catch((error)=>{
                  console.error(error);
              });
          }}
      />
      <Text> </Text>
      <Button title='Delete'
              onPress={()=>{
                  Alert.alert("Confirm Delete", "Are you sure you want to delete this card?",
                      [
                          {
                              text:"Cancel",
                              style:"cancel",
                          },
                          {
                              text:"Yes",
                              onPress:()=>{
                                  ToastAndroid.show(
                                      "Deleting confirmed",
                                      ToastAndroid.SHORT
                                  );
                                 fetch("https://onlinecardappwebservice-y487.onrender.com/deletecard/"+route.params.id,
                                     {
                                         method:"DELETE"
                                     }
                                 ).then(()=>{
                                     navigation.navigate("Home");
                                 });
                              },
                          },
                      ]
                  );
              }}
      />
    </View>
  );
};

export default Edit;