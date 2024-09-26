import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({

    pagina:{
        flex:1,
        
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginLeft:20,
        marginTop:20,
        gap:8

    },
    headerText:{
        fontSize:28,
        fontWeight:'bold'
    },
    floatingButtonView:{
       position:"absolute",
       right:20,
       bottom:160,
       padding:12,
       backgroundColor:"#EB690B",
       borderRadius:10,
        zIndex:1
    },
    floatingBtn:{
        
        
    },
  
    insideModal:{
      
    },
    listIconView:{
        backgroundColor:"#EB690B",
        padding:6,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center'

    },
    cardContainer:{
        top:40
    },
    absolute:{
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1, 
    },
    modalPriorityText:{
        fontSize:18,
        // fontWeight:'bold'
    },

    paginaModal:{
        width:340,
        height:140,
        borderRadius:8,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        borderColor:'black',
        borderWidth:1.5,
        backgroundColor:'white'
    },

    cardEsquerda:{
        marginLeft:12,
        justifyContent:'space-around'

    },
    cardDireita:{
        marginRight:12,
        justifyContent:'space-around',
        
       
    },
    tarefaView:{
        marginTop:4,
        width:180,
        // backgroundColor:'blue'
        
    },
    tarefaText:{
        fontSize:20,
        fontWeight:'bold'
    },
    dataView:{
        marginBottom:16,
        // backgroundColor:'yellow'

    },
    dataText:{
        fontSize:16
    },
    prioridadeView:{
        padding:8,
        borderRadius:16,
        borderColor:'grey',
        borderWidth:2,
        marginTop:4,
        alignItems:'center',
        justifyContent:'center'
        // backgroundColor:'red'
    },

    prioridadeText:{

    },
    progressoView:{
        padding:8,
        borderRadius:16,
        borderColor:'grey',
        borderWidth:2,
        marginBottom:16,
        alignItems:'center',
        justifyContent:'center'
        // backgroundColor:'green'

    },
    progressoText:{
        alignSelf:'center'
    }, 
    saveBtn:{
        borderColor:'black',
        borderWidth:1.5,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        backgroundColor:'white'

    },
    saveBtnText:{
        fontSize:18,
        fontWeight:'bold'
    },
    closeView:{
        left:180,
        top:10,
        flexDirection:"row",
        gap:16,
        // borderWidth:1,
        // borderColor:'grey',
        
    },






    paginaEdit:{
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
    cardEsquerdaEdit:{
        marginLeft:16,
        justifyContent:'space-between',
        // backgroundColor:'green',
        flex:2
    },
    cardDireitaEdit:{
        marginRight:12,
        justifyContent:'space-between',
        alignItems:'flex-end',
        flexDirection:'row',
        gap:6,
        left:4
        // backgroundColor:'red'
        
        
    },
    closeViewEdit:{
        left:180,
        top:10,
        flexDirection:"row",
        gap:16,
        // borderWidth:1,
        // borderColor:'grey',
        
    },
    tarefaViewEdit:{
        marginTop:16,
        width:180,
        // backgroundColor:'red'
        
    },
    tarefaTextEdit:{
        fontSize:20,
        fontWeight:'bold'
    },
    dataViewEdit:{
        marginBottom:16
    },
    dataTextEdit:{
        fontSize:16
    },
    prioridadeViewEdit:{
        
        borderRadius:16,
        borderColor:'grey',
        borderWidth:2,
        marginBottom:12,
        alignItems:'center',
        width:85,
        height:50,
        justifyContent:'center'

    },

    prioridadeTextEdit:{
        fontWeight:'bold',
        textAlign:'center'
    },
    progressoViewEdit:{
        borderRadius:16,
        borderColor:'grey',
        borderWidth:2,
        marginBottom:12,
        width:85,
        height:50,
        alignItems:'center',
        justifyContent:'center'
        
        
    },
    progressoTextEdit:{
        fontWeight:'bold',
        alignSelf:'center'
    },




})
