import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, 
        Text, View, 
        TextInput, 
        TouchableOpacity, 
        Modal,
        Image,
        Alert } from 'react-native';
import Entrar from './src/Modal'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      alcool: 0,
      gasolina: 0,
      modalVisible: false,
      resultado: '',
      precoAlcool: '',
      precoGasolina: ''
    }
    this.calcular = this.calcular.bind(this);
    this.sair = this.sair.bind(this);
  }

  async componentDidMount(){
    await AsyncStorage.getItem('alcool').then((valAlcool)=>{
      this.setState({precoAlcool:valAlcool})
    })
    await AsyncStorage.getItem('gasolina').then((valGasolina)=>{
      this.setState({precoGasolina:valGasolina})
    })

  }

  async componentDidUpdate(_, prevState){
    let alcool = this.state.precoAlcool
    let gasolina = this.state.precoGasolina
    if(prevState !== alcool || prevState !== gasolina){
      await AsyncStorage.setItem('alcool', alcool)
      await AsyncStorage.setItem('gasolina', gasolina)
    }
  }

  sair(novo){
    this.setState({modalVisible: novo})
  }

  calcular(){
    if(this.state.alcool == '' || this.state.gasolina == ''){
      return Alert.alert('ERROR','Insira os dados para calcular')
    }else{
      let alcool = this.state.alcool
      let gasolina = this.state.gasolina
      let result = alcool / gasolina
      let opcao = ''
      if(result < 0.7){
        opcao = ' Ácool'
      }else{
        opcao = ' Gasolina'
      }
      this.setState({resultado: opcao,
      precoAlcool:alcool,
      precoGasolina:gasolina})


      return this.setState({modalVisible:true})
    }
  }

  render(){  
    return (
      <View style={styles.container}>
        <View style={styles.areaLogo}>
          <Image 
          source={require('./src/Img/logo.png')}
          style={styles.imgLogo}
          />
        </View>
        <Text style={styles.txtTopo}>Qual melhor opção?</Text>

        <Text style={styles.txtEntradas}>Álcool (Preço por litro):</Text>
        <TextInput 
        style={styles.input}
        placeholder="Digite o preço do álcool"
        underlineColorAndroid="transparent"
        onChangeText={(preco) => this.setState({alcool: preco})}
        keyboardType="numeric"
        />

        <Text style={styles.txtEntradas}>Gasolina (Preço por litro):</Text>
        <TextInput 
        style={styles.input}
        placeholder="Digite o preço da gasolina"
        underlineColorAndroid="transparent"
        onChangeText={(preco) => this.setState({gasolina: preco})}
        keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botao} onPress={this.calcular}>
          <Text style={styles.txtBotao}>Calcular</Text>
        </TouchableOpacity>

        <Modal animationType="slide" visible={this.state.modalVisible}>
          <View>
            <Entrar combust={this.state.resultado}
            gasolina2={this.state.gasolina}
            alcool2={this.state.alcool}
            fechar={ ()=> this.sair(false) }  />
          </View>
        </Modal>

        <Text style={styles.ultimos}>Últimos preços calculados:</Text>
        <View style={styles.areaAsync}>
          <Text style={styles.textsAsync}>Álcool: R${this.state.precoAlcool}</Text>
          <Text style={styles.textsAsync}>Gasolina: R${this.state.precoGasolina}</Text>
        </View>

        <StatusBar style="light" />
      </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imgLogo:{
    height: 200,
    width: 200
  },
  areaLogo:{
    marginTop: 120,
    alignItems: 'center'
  },
  txtTopo:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
    margin: 30,
    textAlign: 'center'
  },
  txtEntradas:{
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 35
  },
  input:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#999999',
    backgroundColor: '#EEEEEE',
    color: '#000000',
    height: 38,
    padding: 10,
    marginTop: 5,
    marginLeft: 15,
    width: 375
  },
  botao:{
    alignItems: 'center',
    backgroundColor: '#ff4040',
    width: 375,
    marginLeft: 15,
    marginTop:20,
    height: 38,
    justifyContent: 'center',
    
  },
  txtBotao:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17
  },
  ultimos:{
    fontSize: 15,
    color: '#FFF',
    marginLeft: 15,
    marginTop: 25
  },
  areaAsync:{
    flexDirection: 'row'
  },
  textsAsync:{
    color: '#FFF',
    margin: 15
  }

});
