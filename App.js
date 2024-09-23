import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

//passando a função e variaves.
export default function App() {
  const [area1, setArea1] = useState('');
  const [area2, setArea2] = useState('');
  const [area3, setArea3] = useState('');
  const [area4, setArea4] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  //definindo variavel para o usuario selecionar.
  const handleCalculateAQR = async () => {
    try {
      setError(null); // Reset error
      const response = await fetch(
        `http://26.215.35.92:3000/aqr?area1=${area1}&area2=${area2}&area3=${area3}&area4=${area4}`
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error);
        setResult(null);
      }
    } catch (err) {
      setError('Erro de rede ou servidor!');
      setResult(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área de Quadrado e Retângulo</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Altura 1"
        value={area1}
        onChangeText={setArea1}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Largura 1"
        value={area2}
        onChangeText={setArea2}
      />

        <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Altura 2"
        value={area3}
        onChangeText={setArea3}
        /> 

        <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Largura 2"
        value={area4}
        onChangeText={setArea4}
      />


      <Button title="Calcular" onPress={handleCalculateAQR} />

      {result !== null && <Text style={styles.result}>Resultado: {result}</Text>}
      {error && <Text style={styles.error}>Erro: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});