import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

export default class Entrar extends Component {
    render() {
        return (
        <View style={styles.areaModal}>
            <View style={styles.areaImgModal}>
                <Image 
                style={styles.imgModal}
                source={require('../Img/gas.png')}
                />
            </View>
     
            <Text style={styles.texto}>Compensa usar{this.props.combust}</Text>

            <Text style={styles.textoResult}>Com os preços:</Text>
            <Text style={styles.textoAG}>Álcool: R$ {this.props.alcool2}</Text>
            <Text style={styles.textoAG}>Gasolina: R$ {this.props.gasolina2}</Text>
            
            <TouchableOpacity style={styles.botaoModal} onPress={this.props.fechar}>
                <Text style={styles.txtBotaoModal}>Calcular novamente</Text>
            </TouchableOpacity>
            <StatusBar style="light" />
        </View>
    );
  }
}
const styles = StyleSheet.create({
    areaModal:{
        backgroundColor: '#222',
        width: '100%',
        height: '100%'
    },
    imgModal:{
        height: 200,
        width: 200
    },
    areaImgModal:{
        marginTop: 120,
        alignItems: 'center'
    },
    botaoModal:{
        alignItems: 'center',
        backgroundColor: '#000',
        width: 300,
        marginLeft: 55,
        marginTop:40,
        height: 38,
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'#ff4040',
        borderRadius:9,
      },
      txtBotaoModal:{
        color: '#ff4040',
        fontWeight: 'bold',
        fontSize: 17
      },
      textoResult:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        margin: 20,
        textAlign: 'center'
      },
      texto:{
        fontSize:25,
        fontWeight: 'bold',
        color: '#228b22',
        margin: 20,
        textAlign: 'center'
      },
      textoAG:{
        fontSize:15,
        color: '#FFF',
        textAlign: 'center'
      }

});