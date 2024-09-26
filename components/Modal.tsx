import { Modal as RNModal, ModalProps, KeyboardAvoidingView, View, Platform  
} from "react-native";

type PROPS = ModalProps & {
   isOpen: boolean
   withInput?: boolean  

}

export const Modal = ({isOpen, withInput, children, ...rest}:PROPS) =>{
   const content = withInput ?(
       <KeyboardAvoidingView style={{alignItems:'center', justifyContent:'center', flex:1, padding: 4}}
       behavior={Platform.OS === "ios" ? "padding" : "height"} 
       >
           {children}
       </KeyboardAvoidingView>
       )    :   (
       <View style={{alignItems:'center', justifyContent:'center', flex:1, padding: 4}}>
           {children}
       </View>
       )

       return(
           <RNModal
           visible={isOpen}
           transparent={true}
           animationType="slide"
           statusBarTranslucent
           {...rest}
           >
               {content}
           </RNModal>
       )
}