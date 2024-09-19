import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';

const LAPTOP_IP = '192.168.68.106:3000'; // Your laptop's IP address

const LoginScreen = () => {
  const [users, setUsers] = useState([]);
  const [testResponse, setTestResponse] = useState(null);

  const fetchTestEndpoint = () => {
    axios.get(`https://${LAPTOP_IP}/test`)
      .then(response => {
        console.log('Test Response status:', response.status);
        console.log('Test Response headers:', JSON.stringify(response.headers));
        setTestResponse(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching from test endpoint:', error);
        Alert.alert('Error', 'Failed to fetch from test endpoint');
      });
  };

  const fetchUsers = () => {
    axios.get(`https://${LAPTOP_IP}/api/fetch/users_all`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', JSON.stringify(response.headers));
        console.log('Success:', JSON.stringify(response.data));
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error type:', typeof error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        if (error.response) {
          console.error('Error response:', JSON.stringify(error.response.data));
        }
        Alert.alert('Error', 'Failed to fetch users');
      });
  };

  return (
    <View style={{ padding: 50 }}>
      <Button title="Test Connection" onPress={fetchTestEndpoint} />
      {testResponse && <Text>Test Response: {testResponse}</Text>}
      <Button title="Fetch Users" onPress={fetchUsers} />
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>User Name: {item.user_name}</Text>
            <Text>Email: {item.user_email}</Text>
            <Text>Phone: {item.user_phone}</Text>
            <Text>Address: {item.user_address}</Text>
            <Text>City: {item.user_city}</Text>
            <Text>State: {item.user_state}</Text>
            <Text>Zip: {item.user_zip}</Text>
            <Text>Country: {item.user_country}</Text>
            <Text>Role: {item.user_role}</Text>
            <Text>Status: {item.user_status ? 'Active' : 'Inactive'}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default LoginScreen;
