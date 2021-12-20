import React from 'react';
import {StyleSheet, Text, Pressable, View, Alert, Modal} from 'react-native';
const CModal = props => {
  const {modalVisible, setModalVisible} = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={style.main}>
        <Text style={{color: 'black', fontSize: 30}}>{props.children}</Text>
        <Pressable
          style={{
            backgroundColor: '#0367B3',
            width: '50%',
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={style.hideButtonText}>Закрыть</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  main: {
    position: 'absolute',
    top: '30%',
    display: 'flex',
    justifySelf: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    height: '30%',
    borderWidth: 1,
  },
  hideButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default CModal;
