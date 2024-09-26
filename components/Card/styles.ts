import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
  
    pagina:{
        width:340,
        height:130,
        borderRadius:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        borderColor:'grey',
        borderWidth:2,
        backgroundColor:'white'
        
        
    },
    cardEsquerda:{
        marginLeft:16,
        justifyContent:'space-between',
        // backgroundColor:'green',
        flex:2
    },
    cardDireita:{
        marginRight:12,
        justifyContent:'space-between',
        alignItems:'flex-end',
        flexDirection:'row',
        gap:6,
        left:4
        // backgroundColor:'red'
        
        
    },
    closeView:{
        left:180,
        top:10,
        flexDirection:"row",
        gap:16,
        // borderWidth:1,
        // borderColor:'grey',
        
    },
    tarefaView:{
        marginTop:16,
        width:180,
        // backgroundColor:'red'
        
    },
    
    dataView:{
        marginBottom:16
    },
    dataText:{
        fontSize:16
    },
    prioridadeView:{
        
        borderRadius:16,
        borderColor:'grey',
        borderWidth:2,
        marginBottom:12,
        alignItems:'center',
        width:85,
        height:50,
        justifyContent:'center'

    },

    prioridadeText:{
        fontWeight:'bold'
    },
    progressoView:{
        borderRadius:16,
        borderColor:'grey',
        borderWidth:2,
        marginBottom:12,
        width:85,
        height:50,
        alignItems:'center',
        justifyContent:'center'
        
        
    },
    progressoText:{
        fontWeight:'bold',
        alignSelf:'center'
    },
    absolute:{
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1, 
    },
})