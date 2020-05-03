import * as React from 'react';
import {StyleSheet, ScrollView, View, Text, TouchableHighlight, TextInput, ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

const defaultProps = {
    messages: [{
        content:'some content',
        date:'some date',
        userID:'some ID',
    }],
    user:{
        userID:'some ID',
        userName:'name',
    }
  }

export default function App(props){

    /*props include:
      sendMessages(sentmessage) - function that determines what is done with sent messages from the enter key/send button
      styles - if provided, will override every other style
      messages - an array of message objects that will be rendered
                  a message object looks like:
                  {
                    content: 'Test of the message.',
                    date: currentDate,
                    userID:'some random ID',
                  }
      navigation - navigation prop for page handling
      user - an object that holds the current userID or userName
                {
                    userID:'someRandomID',
                    userName:'someUserName',
                },

      Planned:
      bubbleToColor - 
      bubbleFromColor -
      bubbleFontColor -
      bubbleFontSize -
      backButtonColor - 
      chatFontFamily -
    */
      
    const [displayMessages,setDisplayMessages] = React.useState(props.messages);
    const [formValue,setFormValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const currentDate = moment().format("MM/DD/YYYY HH:mm");
    const currentID = props.user.userID ? props.user.userID : Math.random().toString(36).substr(2, 11);
    const textInput = React.createRef();


    const submitInfo = () => {
        setLoading(true);
        if(formValue === '')
            return;
        const message = {
            'content': formValue,
            'date':currentDate,
            'userID':currentID,
        }
        props.sendMessage(message);
        setDisplayMessages((displayMessages)=>{
          return displayMessages.push(message);
        })
        setFormValue('');
        textInput.current.clear();
        setLoading(false);
    }

    const goBack = () => {
        props.navigation();
    }

    const showMessages = () =>{
        return (displayMessages.map((items)=>{
            {items.content==='' && null}
            if(items.userID === currentID){
                return (
                <View style={defaultStyles.bubbleTo}>
                <Text style={defaultStyles.bubbleTxt}>{items.content}</Text>
                <Text style={defaultStyles.bubbleDate}>{items.date}</Text>
                </View>
                )
            }
            else{
                return(
                <View style={defaultStyles.bubbleFrom}>
                <Text style={defaultStyles.bubbleTxt}>{items.content}</Text>
                <Text style={defaultStyles.bubbleDate}>{items.date}</Text>
                </View>
                ) 
            }   
        }))
        
    }
    

    const txt = '>';
    return(
        <View style={defaultStyles.container}>
        <KeyboardAwareScrollView style={{}}   scrollEnabled={false} extraScrollHeight={130} enableOnAndroid={true} enableResetScrollToCoords={true}>
            
            <View style={defaultStyles.topbar}>
                <Text style={defaultStyles.toptxt}>
                    {props.user.userName}
                </Text>
                <TouchableHighlight onPress={() => goBack()} style={defaultStyles.iconButton}>   
                <Text style={{textAlign:`center`,fontSize:45,color:`#FF7D00`}}>
                    {txt}
                </Text>        
                </TouchableHighlight>
                </View>
            <View style={defaultStyles.chatcontain}>
                <ScrollView contentContainerStyle={defaultStyles.scroll}>
                    {showMessages()}
                </ScrollView>
            </View>
            
            {loading && <ActivityIndicator size="large"  style={{marginBottom:15}} color='#FDB372'/>}

            <View style={defaultStyles.footer}>
                <TextInput
                secureTextEntry={false}
                placeholderTextColor = "#151616"
                placeholder="Type Another"
                onChangeText={(text) => setFormValue(text)}
                onSubmitEditing={submitInfo}
                autoCapitalize="words"
                autoCorrect={true}
                ref={textInput}
                style={defaultStyles.textInput}/>
      
                <TouchableHighlight style={defaultStyles.submitBtn} onPress={submitInfo}>
                    <Text style={defaultStyles.btnTxt}>
                        Send
                    </Text>
                </TouchableHighlight>

            </View>

            </KeyboardAwareScrollView>
            </View> 
    ) 
}

const defaultStyles = StyleSheet.create({
    chatcontain:{
        height:510,
    },
    container:{
        flex:1,
        backgroundColor: '#FFF',
    },
    toolBar:{
        borderTopWidth:0,    
        height:50,
    },
    toptxt:{
        width:290,
        fontSize:40,  
        marginRight:50,
    },
    topbar:{
        padding:10,  
        paddingTop:20,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignItems: 'flex-start', 
    },
    footer:{
        flexDirection: 'row',
        height:100,
        flexWrap: 'wrap', 
        alignItems: 'flex-end',
        padding:15,
        paddingTop:0,
        bottom:0,
    },
    bubbleFrom:{
        elevation:5,
        maxWidth:220,
        margin:10,
        marginLeft:20,
        padding:10,
        backgroundColor:`#FDB372`,
        borderRadius:15,
    },
    bubbleTo:{
        elevation:5,
        maxWidth:220,
        margin:10,
        marginLeft:20,
        padding:10,
        alignSelf: 'flex-end',
        borderRadius:15,
        backgroundColor:`#FF7563`,
    },
    bubbleTxt:{
        color:`#FFF`,
        fontSize:20,
    },
    bubbleDate:{
        color:`#FFF`,
        bottom:0,
        fontSize:15,
    },
    submitBtn:{
        marginBottom:35, marginLeft:45,
        elevation:5,
        borderRadius:15,
        width:85,
        height:50,
        justifyContent:`center`,
        backgroundColor:`#FFF`,
    },
    btnTxt:{
        textAlign:`center`,
        color:`#000`,
        fontSize:25,
    },
    textInput:{
        height:100,
        width:230,
        margin:10,
        fontSize:20,
    },
    iconButton:{
        height:50,
        width:50,
        right:0,
        alignSelf:`flex-end`,
        marginBottom:0,
        alignContent:`center`,
        justifyContent:`center`,
    },
});
