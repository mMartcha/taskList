import {Pressable, Text, TextInput, View } from "react-native";
import {styles} from "@/components/Card/styles"
import { useContext, useState } from "react";
import { TaskContext, TaskProps } from "@/context/TaskContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal } from "../Modal"; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ItemsProps {
    item: TaskProps; 
    onDelete: (item: TaskProps) => void; 
}
export default function Card({item, onDelete}:ItemsProps){

    const {setSelectedTask, SetMoreOptions} = useContext(TaskContext)
    const [isChecked, setIsChecked] = useState(false)


   

    function openMoreOption(){
        SetMoreOptions(true)
        setSelectedTask(item)
    }

    return(
        <View style={styles.pagina}>
            
            <View style={styles.cardEsquerda}>
                <View style={styles.tarefaView}>
                    <Pressable onPress={() =>!isChecked}>
                        <Text style={{fontSize:20, fontWeight:'bold', textDecorationLine:isChecked? 'line-through' : 'none' }}>{item.tarefaText}</Text>
                    </Pressable>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.data}</Text>
                </View>
            </View>

                <View style={styles.closeView}>
                    <Pressable onPress={()=> openMoreOption()}>
                        <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                    </Pressable>
                    
                </View>

            <View style={styles.cardDireita}>
                <View style={styles.prioridadeView}>
                    <Text>Prioridade</Text>
                    <Text style={styles.prioridadeText}>{item.taskPriority}</Text>
                </View>

                <View style={styles.progressoView}>
                    <Text>Progresso</Text>
                    <Text style={styles.progressoText}>{item.taskProgress}%</Text>
                </View>
            </View>
        
        </View>
        
    )
}

 // function handlePress(){
    //     setEditModalOpen(false);
    //     const updatedList = taskList.map((currentItem: TaskProps) =>
    //         currentItem.id === item.id
    //         ? {...currentItem, tarefaText}
    //         : currentItem
    //     );
    //     setTaskList(updatedList);
    //     setTarefaText("")
    //     console.log(updatedList)
    //     // pushString();
        
    // }
    
    // function leTest(){
    //     setSelectedTask(item)
    //     setEditModalOpen(true)
    //     console.log(item)
    //     SetMoreOptions(false)
    // }