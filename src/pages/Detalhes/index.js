import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import * as MailComposer from 'expo-mail-composer';



export default function Detalhe(){
    
    const navigation =  useNavigation();
    const route = useRoute();
    const competicao = route.params.competicao;


    const messege = `Olá ${competicao.nome}, estou entrando em contato pois gostaria de ajudar no caso ${competicao.descricao} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'} ).format(competicao.valor)}`;

    function navigateBack(){
        navigation.goBack();
    }


    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${competicao.descricao}`,
            recipients: [competicao.email],
            body: messege,

        })

    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${competicao.watsapp}&text=${messege}`)

    }

    return (
        <View style={styles.container}>
           			<View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size ={28} color="#E02041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.competicoes}>
				<Text style={styles.competicoesPropriedade, {marginTop: 0} } >CARTOLEIRO:</Text>
                    <Text style={styles.competicoesValor}>{competicao.nome}</Text>

                    <Text style={styles.competicoesPropriedade} >COMPETIÇAO:</Text>
                    <Text style={styles.competicoesValor}>{competicao.descricao}</Text>

                    <Text style={styles.competicoesPropriedade} >VALOR:</Text>
                    <Text style={styles.competicoesValor}>{Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL'}
                        ).format(competicao.valor)}</Text>
            </View>
            <View style={styles.contato}>
                <Text style={styles.heroTitle} >Salve o dia</Text>
                <Text style={styles.heroTitle} >Seja o herói desse caso!</Text>
                <Text style={styles.heroDescricao} >Entre em contato:</Text>

                <View style={styles.acoes}>
                    <TouchableOpacity style={styles.acao} onPress={sendWhatsapp}>
                        <Text style={styles.textoAcao}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acao} onPress={sendMail}>
                        <Text style={styles.textoAcao}>E-mail</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    )
}