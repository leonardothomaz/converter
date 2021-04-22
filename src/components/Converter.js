import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const api = axios.create();

export default function Converter() {
  const [price, setPrice] = useState("0");
  const [priceOriginal, setOriginal] = useState("0");
  const [real, setReal] = useState("0");
  const [isEnabled, setIsEnabled] = useState(false);
  const [onRequest, setOnRequest] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    const coin = isEnabled ? "EUR" : "USD";

    setOnRequest(true);
    priceCoin(coin).then((v) => {
      const value = isEnabled ? v.EUR_BRL : v.USD_BRL;
      setOriginal(value);
      setOnRequest(false);
    });
  }, [isEnabled]);

  function calculateFinalPrice() {
    if (onRequest) {
      setPrice("Aguarde, consultando a cotação da moeda");
      return false;
    }
    const formatedValue = parseFloat(real);

    const finalValueConvert = priceOriginal * formatedValue;

    setPrice(
      `O valor informado equivale a: ${isEnabled ? "EUR" : "USD"} ${finalValueConvert
        .toFixed(2)
        .replace(".", ",")}`
    );
  }

  async function priceCoin(coin) {
    const response = await api.get(
      `https://free.currconv.com/api/v7/convert?q=${coin}_BRL&compact=ultra&apiKey=5d8c13e77f88fa20acf6`
    );
    return response.data;
  }

  return (
    <>
      <Text style={styles.textWithPaddinTopp}>Valor em Reais:</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={setReal}
          value={real}
        />
      </View>
      <View style={styles.viewInlineCenter}>
        <Text style={styles.text}>USD</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#11727c" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={styles.textValue}>EUR</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={calculateFinalPrice}>
          <Text style={styles.textButton}>Converte ai!</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{price}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: 280,
    height: 40,
    color: "#11727c",
    borderColor: "#000",
    borderWidth: 0.1,
    borderRadius: 40,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  textInputWithError: {
    width: 280,
    height: 40,
    color: "#FFF",
    borderColor: "#c53030",
    borderWidth: 1.5,
    borderRadius: 40,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  text: {
    paddingLeft: 70,
    paddingTop: 5,
    paddingRight: 5,
    color: "#FFF",
    backgroundColor: "#000000",
  },
  textWithPaddinTopp: {
    paddingLeft: 70,
    paddingTop: 50,
    paddingRight: 5,
    color: "#FFF",
  },
  textValue: {
    color: "#FFF",
  },
  picker: {
    width: 275,
    color: "#FFF",
  },
  viewInline: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  viewInlineCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ceffff",
    padding: 10,
    borderRadius: 50,
    width: 200,
    borderColor: "#11727c",
    borderWidth: 2,
  },
  textButton: {
    color: "#11727c",
  },
});
