import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export  function ListEmpty(){
    return(
        <View style={{alignItems:'center', marginTop:80}}>
            <FontAwesome name="list-alt" size={70} color="#EB690B" />
            <Text style={{fontSize:16, color:'black'}}>Adicione tarefas!</Text>
        </View>
    )
}