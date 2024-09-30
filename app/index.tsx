import Card from "@/components/Card";
import { FlatList, Pressable, SafeAreaView, Text, TextInput, View, Platform, Alert } from "react-native";
import { styles } from "@/app/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Modal } from "@/components/Modal";
import { useContext, useEffect, useState } from "react";
import { TaskContext, TaskProps } from "@/context/TaskContext";
import uuid from 'react-native-uuid';
import { BlurView } from "expo-blur";
import DateTimePicker from "@react-native-community/datetimepicker"
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListEmpty } from "@/components/ListEmpty";



export default function App(){
 
    const {
        taskList, setTaskList,
        data, setData,
        tarefaText, setTarefaText,
        taskProgress, setTaskProgress,
        taskPriority, setTaskPriority,
        editModalOpen, setEditModalOpen,
        selectedTask, setSelectedTask,
        moreOptions, SetMoreOptions,} = useContext(TaskContext);

    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)

    const toggleDatePicker = () =>{
        setShowPicker(!showPicker)
    }

    const onChange = ({type}: any, selectedDate: any) => {
        if(type == "set"){
            const currentDate = selectedDate
            setDate(currentDate)
            
            if(Platform.OS === "android"){
                toggleDatePicker()
                setData(currentDate.toDateString())
            }
        }else{
            toggleDatePicker()
        }
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [modalPriorityOpen, setModalPriorityOpen] = useState(false);
    const [modalProgressOpen, setModalProgressOpen] = useState(false);
    const [sureToDelete, setSureToDelete] = useState(false)

    const insets = useSafeAreaInsets();


    // function pushString(){
    //     setModalOpen(false);
    //     if((data.trim()) && (tarefaText.trim())){
    //         setTaskList([...taskList,{id: uuid.v4().toString(), tarefaText: tarefaText,
    //                     isChecked: false, data: data, taskProgress: taskProgress,
    //                     taskPriority:taskPriority, editModalOpen: editModalOpen}]);
    //         setTarefaText('');
    //         setData('');
    //         setTaskPriority('?')
    //         setTaskProgress(0)
    //         console.log(taskList);
    //         }
    //         storeTaskList(taskList)
    //     }
    const newTaskList = [...taskList, {
        id: uuid.v4().toString(),
        tarefaText: tarefaText,
        isChecked: false,
        data: data,
        taskProgress: taskProgress,
        taskPriority: taskPriority,
        editModalOpen: editModalOpen
    }];

    const pushString = () => {
        setModalOpen(false);
        if (data.trim() && tarefaText.trim()) {
            setTaskList(newTaskList);
            storeTaskList(newTaskList); // Salva a lista atualizada no AsyncStorage
            setTarefaText('');
            setData('');
            setTaskPriority('?');
            setTaskProgress(0);
        }
    };
    

    function modalSureToDelete(){
        setSureToDelete(false)
        handleDelete(selectedTask);
        }


    function handlePress(){
        if((tarefaText === '') || (taskPriority === '')){
            Alert.alert('Tarefa','Informe a tarefa antes de sair')
        }

        const updatedList = taskList.map((currentItem: TaskProps) =>
            currentItem.id === selectedTask.id
            ? {...currentItem, tarefaText, taskPriority, taskProgress}
            : currentItem
        );
        setTaskList(updatedList);
        console.log(updatedList)
        setTaskPriority('')
        setTaskProgress(0)
        
        if((tarefaText !== "") && (taskPriority !== "")){
            setEditModalOpen(false);
        }
        
    }

    function leTest(){
        setEditModalOpen(true)
        SetMoreOptions(false)
        }

    const handleDelete = (itemToDelete: TaskProps) =>{
        console.log(itemToDelete);
        const deleteList = taskList.filter(item => item.id !== itemToDelete.id);
        setTaskList(deleteList);
        SetMoreOptions(false)
        storeTaskList(deleteList)
        }

        const storeTaskList = async (value: TaskProps[]) => {
            try {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem('taskList', jsonValue); 
                console.log('Lista de tarefas salva:', jsonValue);
            } catch (error) {
                console.error('Erro ao salvar a lista de tarefas:', error);
            }
        };

        // const storeTaskList = async (value: TaskProps[]) =>{
        //     try{
        //         const jsonValue = JSON.stringify(value)
        //         await AsyncStorage.setItem(tarefaText, jsonValue)
        //         console.log(jsonValue + 'estou aqui')
        //     }catch(error){
        //         throw error
        //     }
        // }

        const getTaskList = async () => {
            try {
                const taskListValue = await AsyncStorage.getItem('taskList'); 
                if (taskListValue !== null) {
                    const parsedList = JSON.parse(taskListValue);
                    setTaskList(parsedList); 
                    console.log('Lista de tarefas carregada:', parsedList);
                }
            } catch (error) {
                console.error('Erro ao carregar a lista de tarefas:', error);
            }
        };

        // const getTaskList = async () =>{
        //     try{
        //         const taskListValue = await AsyncStorage.getItem(tarefaText)
        //         return taskListValue != null ? JSON.parse(taskListValue) : null
        //         }catch(error){
        //             throw error
        //         }
        // }

        useEffect(() => {
            getTaskList();
        }, []); 


    return (
        <SafeAreaView style={styles.pagina}>
            <View style={{ flex: 1, paddingTop: insets.top }}>

                <View style={styles.header}>
                    <View style={styles.listIconView}>
                        <FontAwesome name="list-alt" size={24} color="black" />
                    </View>
                    <Pressable onPress={getTaskList}>
                        <Text style={styles.headerText}>Lista de afazeres</Text>
                    </Pressable>
                </View>

                <View style={styles.floatingButtonView}>
                    <Pressable
                        onPress={() => setModalOpen(true)}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#EB690B' : '#EB690B',
                                transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }],
                                borderRadius: 12,
                            },
                        ]}
                    >
                        <FontAwesome6 name="plus" size={24} color="black" />
                    </Pressable>
                </View>

                {modalOpen && (
                    <BlurView
                        style={styles.absolute}
                        intensity={50} 
                        tint="dark" 
                    />
                )}

                {editModalOpen && (
                    <BlurView
                        style={styles.absolute}
                        intensity={50} 
                        tint="dark" 
                    />
                )}

                <View style={styles.cardContainer}>
                    <FlatList
                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        contentContainerStyle={{ paddingBottom: 130 }}
                        data={taskList}
                        renderItem={({ item }) => (
                            <Card
                                key={item.id}
                                onDelete={handleDelete}
                                item={item}
                            />
                        )}
                        ListEmptyComponent={() =><ListEmpty/>}
                    />
                </View>

                <Modal isOpen={modalOpen}>
                    <View style={styles.insideModal}>
                        <View style={styles.paginaModal}>
                            <View style={styles.cardEsquerda}>
                                <View style={styles.tarefaView}>
                                    <TextInput
                                        style={styles.tarefaText}
                                        placeholder="Adicionar Tarefa!"
                                        onChangeText={setTarefaText}
                                        value={tarefaText}
                                        cursorColor={'black'}
                                    />
                                </View>

                                <View style={styles.dataView}>
                                    
                                     {!showPicker &&(
                                        <Pressable
                                        onPress={toggleDatePicker}>
                                          <TextInput
                                              style={styles.dataText}
                                              placeholder="Adicionar Data!"
                                              onChangeText={setData}
                                              value={data}
                                              cursorColor={'black'}
                                              editable={false}
                                          />
                                       </Pressable>
                                     )}

                                    {showPicker &&(
                                        <DateTimePicker
                                        mode="date"
                                        display="spinner"
                                        value={date}
                                        onChange={onChange}
                                        />
                                    )}
                                </View>
                            </View>

                            <View style={styles.cardDireita}>
                                <View style={styles.prioridadeView}>
                                    <Pressable onPress={() => setModalPriorityOpen(true)}
                                    style={({ pressed }) => [
                                        {
                                            transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }],
                                        },
                                    ]}
                                >
                                        <Text style={styles.prioridadeText}>Prioridade: {taskPriority}</Text>

                                    </Pressable>
                                </View>
                                <View style={styles.progressoView}>
                                    <Pressable onPress={() => setModalProgressOpen(true) }
                                        style={({ pressed }) => [
                                            {
                                                transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }],
                                            },
                                        ]}
                                    >
                                        <Text style={styles.progressoText}>Progresso: {taskProgress}%</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <Pressable onPress={() => pushString()}>
                            <View style={styles.saveBtn}>
                                <Text style={styles.saveBtnText}>Salvar/Voltar</Text>
                            </View>
                        </Pressable>
                    </View>
                </Modal>

            </View>

            <Modal isOpen={modalPriorityOpen}>
                <View style={{backgroundColor:'white',borderColor:'black', borderWidth:1, flexDirection:'row', gap:12, alignItems:'center', justifyContent:'center', padding:16, borderRadius:12}}>
                    <View style={{gap:12,padding:8, flexDirection:'row'}}>
                        <View style={{backgroundColor:'#00b37e', padding:6, borderRadius:12, alignItems:'center'}}>
                            <Pressable onPress={()=> setTaskPriority("Baixa")}
                            style={({ pressed }) => [
                                {
                                    transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }],
                                    borderRadius: 12,
                                },
                            ]}
                        >
                                <Text style={styles.modalPriorityText}>Baixa</Text>
                            </Pressable>
                        </View>

                        <View style={{backgroundColor:'#EB690B', padding:6, borderRadius:12, alignItems:'center'}}>
                            <Pressable onPress={()=> setTaskPriority("Média")}
                                style={({ pressed }) => [
                                    {
                                        transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }],
                                        borderRadius: 12,
                                    },
                                ]}
                            >
                                <Text style={styles.modalPriorityText}>Média</Text>
                            </Pressable>
                        </View>

                        <View style={{backgroundColor:'#e60000', padding:6, borderRadius:12, alignItems:'center'}}>
                            <Pressable onPress={()=> setTaskPriority("Alta")}
                            style={({ pressed }) => [
                                {
                                    transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }],
                                    borderRadius: 12,
                                },
                            ]}
                        >
                                <Text style={styles.modalPriorityText}>Alta</Text>
                            </Pressable>
                        </View>

                    </View>
                    <View>
                        <Pressable onPress={() => setModalPriorityOpen(false)}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '' : '',
                                transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1}],
                                borderRadius: 12,
                            },
                        ]}
                    >
                            <AntDesign name="closecircleo" size={32} color="black" />
                        </Pressable>
                    </View>

                </View>
            </Modal>


            <Modal isOpen={modalProgressOpen}>
                <View style={{backgroundColor:'white',borderColor:'black', borderWidth:1, flexDirection:'row', gap:12, alignItems:'center', justifyContent:'center', padding:16, borderRadius:12}}>
                    <View style={{gap:12,padding:8,alignItems:'center'}}>

                        <Text style={{fontSize:18}}> {taskProgress}%</Text>

                        <Slider style={{height:20,width:240}} 
                        minimumValue={0}
                        maximumValue={100}
                        value={taskProgress}
                        step={5}
                        onValueChange={(value)=>setTaskProgress(value)}
                        minimumTrackTintColor="#EB690B"
                        thumbTintColor="#EB690B"
                        />
                    </View>

                    <View>
                        <Pressable onPress={() => setModalProgressOpen(false)}
                        style={({ pressed }) => [
                            {
                                transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1.1}],
                            },
                        ]}
                    >
                            <AntDesign name="closecircleo" size={32} color="black" />
                        </Pressable>
                    </View>

                </View>
            </Modal>


            <Modal isOpen={editModalOpen}>
            <View style={styles.paginaEdit}>
                <View style={styles.cardEsquerdaEdit}>
                    <View style={styles.tarefaViewEdit}>
                        <TextInput
                            style={styles.tarefaTextEdit}
                            placeholder={selectedTask.tarefaText}
                            onChangeText={setTarefaText}
                            value={tarefaText}
                            cursorColor={'black'}
                            />
                    </View>
                    <View style={styles.dataViewEdit}>
                           <Text style={styles.dataTextEdit}>{selectedTask.data}</Text>
                    </View>
                </View>

                    <View style={styles.closeViewEdit}>
                        <Pressable onPress={() => handlePress()}>
                            <AntDesign name="closecircleo" size={24} color="black" />
                        </Pressable>
                    </View>

                <View style={styles.cardDireitaEdit}>
                    <View style={styles.prioridadeViewEdit}>
                        <Pressable onPress={() => setModalPriorityOpen(true)}>
                            <Text>Prioridade</Text>
                            <Text style={styles.prioridadeTextEdit}>{taskPriority}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.progressoViewEdit}>
                        <Pressable onPress={() => setModalProgressOpen(true)}>
                            <Text>Progresso</Text>
                            <Text style={styles.progressoTextEdit}>{taskProgress}%</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            </Modal>

            
            <Modal isOpen={moreOptions}>
                <View style={{gap:20, borderColor:'grey', borderWidth:2, borderRadius:12, padding:20,alignItems:'center', backgroundColor:'white'}}>
                    
                    <Pressable onPress={() => SetMoreOptions(false)}>
                        <Text style={{fontWeight:'bold', fontSize:22}}>Opções</Text>
                    </Pressable>

                    <View style={{flexDirection:'row', gap:20}}>
                        <Pressable onPress={() => leTest()}>
                            <FontAwesome6 name="edit" size={32} color="#EB690B" />    
                        </Pressable>
                        <Pressable onPress={ () => setSureToDelete(true)}>
                            <FontAwesome6 name="trash-can" size={32} color="#EB690B" />
                        </Pressable>
                    </View>
                </View>
            </Modal>


            <Modal isOpen={sureToDelete}>
                <View style={{width:260, height:140, borderColor:'grey', borderWidth:1.5, borderRadius:16, backgroundColor:'white', alignItems:'center'}}>
                    <View style={{marginTop:12, gap:4}}>
                        <Text style={{fontWeight:'bold', fontSize:20}}>Excluir</Text>
                        <Text style={{fontSize:14}}>Tem certeza que deseja excluir?</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around',width:260, top:22}}>
                        <View style={{backgroundColor:'#EB690B', width:60, padding:6, borderRadius:12,borderColor:'grey', borderWidth:2}}>
                            <Pressable onPress={() => setSureToDelete(false)}>
                                <Text style={{fontSize:16, textAlign:'center', fontWeight:'bold',color:'white'}}>Não</Text>
                            </Pressable>
                        </View>
                        <View style={{backgroundColor:'#EB690B',width:60, justifyContent:'center', borderRadius:12,borderColor:'grey', borderWidth:2}}>
                            <Pressable onPress={() => modalSureToDelete()}>
                                <Text style={{fontSize:16, textAlign:'center', fontWeight:'bold',color:'white'}}>Excluir</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
        
    );
}
