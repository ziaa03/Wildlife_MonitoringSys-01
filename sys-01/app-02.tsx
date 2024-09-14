import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';

interface Errors {
  email?: string;
  password?: string;
  repeatPassword?: string;
}

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = () => {
    let errors: Errors = {};
      
    if (!email) {        
      errors.email = "*Please enter your email address";
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!reg.test(email)) {
        errors.email = "*Please enter a valid email address";
      }
    }

    if (!password) {
      errors.password = "*Please enter your password";
    } else {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!regex.test(password))
        errors.password = "*Password must contain at least one uppercase letter, one lowercase letter, and one digit.";
    }

    if (!repeatPassword) {
      errors.repeatPassword = "*Please repeat your password";
    } else {
      if (password !== repeatPassword) {
        errors.repeatPassword = "*Please enter the correct password";
      }
    }

    setErrors(errors);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/profile_image.png')} />  
      <Text style={styles.title}>Sign Up Now</Text>   
      <Text style={styles.label}>Welcome Bare Mortal</Text> 

      <View style={styles.form}>       
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          onChangeText={setEmail}
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <TextInput 
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword} 
        />
        {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

        <TextInput 
          style={styles.input}
          placeholder="Repeat Password" 
          secureTextEntry
          onChangeText={setRepeatPassword}
        />
        {errors.repeatPassword ? <Text style={styles.error}>{errors.repeatPassword}</Text> : null}

        <View style={{ marginTop: 20 }}>
          <Button
            title="Join the family"          
            color="#090D99"
            onPress={validateForm} 
          />
        </View>
      </View>
     
      <Text style={styles.or}>Or connect with</Text>
      <View style={styles.socialMediaIcons}>
        <Image style={styles.icons} source={require('../../assets/images/facebook.png')} />
        <Image style={styles.icons} source={require('../../assets/images/twitter.png')} />
        <Image style={styles.icons} source={require('../../assets/images/linkedIn.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#090D99'
  },
  logo: {
    // width: 100,
    // height: 100,
    marginBottom: 32,
  },
  form: {
    width: '80%',
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 24,
  },
  input: {
    borderWidth: 2,
    borderColor: '#DFDFE1',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginTop: 22,
  },
  or: {
    marginTop: 20,
  },
  signUp: {
    color:'#090D99',
    fontWeight:"bold",
  },
  socialMediaIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    marginTop: 16,
  },
  icons: {
    width: 40,
    height: 40
  },
  error: {
    color: 'red', 
    marginBottom: 10,
  }
});