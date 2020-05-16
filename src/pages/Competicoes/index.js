import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import logoImg from '../../assets/logo.png'
import styles from './styles';
import api from '../../services/api';


export default function Competicoes(){
    const [competicoes, setCompeticoes] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDelail(competicao){
        navigation.navigate('Detalhe', { competicao })
    }

    async function loadCompeticoes(){
        if (loading){
            return;
        }

        if (total > 0 && competicoes.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('competicoes', {
            params: { page }
        });

        setLoading(false);

        setCompeticoes([...competicoes, ...response.data]);
        setPage(page + 1);
        setTotal(response.headers['X-Total-Count']);

    }
    useEffect(() => {
        loadCompeticoes();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText} >
                    Total de <Text style={styles.headerTextBold}> { total } competições </Text>.
                </Text>
            </View>
            <Text style={styles.title} >Bem Vindo!</Text>
          
            <FlatList
                style={styles.competicoesLista }
                data={competicoes}
                keyExtractor={ competicao => String(competicao.id) }
                showsVerticalScrollIndicator={false}
                onEndReached={loadCompeticoes}
                onEndReachedThreshold={0.2}
                renderItem={({ item: competicao }) => (
                <View style={styles.competicoes} >
                    <Text style={styles.competicoesPropriedade} >ONG:</Text>
                    <Text style={styles.competicoesValor}>{competicao.nome}</Text>

                    <Text style={styles.competicoesPropriedade} >CASO:</Text>
                    <Text style={styles.competicoesValor}>{competicao.descricao}</Text>

                    <Text style={styles.competicoesPropriedade} >VALOR:</Text>
                    <Text style={styles.competicoesValor}>{Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL'}
                        ).format(competicao.valor)}</Text>

                    <TouchableOpacity style={styles.botaoDetalhe} 
                            onPress ={() => navigateToDelail(competicao)}>
                        <Text style={styles.botaoDetalheTexto} > Ver mais detalhes </Text>
                        <Feather name="arrow-right" size ={16} color="#E02041"/>
                    </TouchableOpacity>
                    
                </View>

                )}
            />
        </View>
    );
}