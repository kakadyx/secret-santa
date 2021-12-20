import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  FlatList,
  View,
} from 'react-native';
import CModal from './components/CModal';

const ButtonBlock = props => {
  const {
    setModalVisible,
    started,
    setStarted,
    getNext,
    shadowNames,
    lastPerson,
  } = props;
  if (started) {
    const nextBtn = shadowNames.length ? (
      <Pressable style={styles.btn}>
        <Text
          onPress={() => {
            getNext();
            setModalVisible(true);
          }}
          style={styles.buttonText}>
          Следующий человек
        </Text>
      </Pressable>
    ) : (
      <></>
    );

    const lastPersonBtn = !started ? (
      <Pressable style={styles.btn}>
        <Text style={styles.buttonText} onPress={() => setModalVisible(true)}>
          Показать последнего
        </Text>
      </Pressable>
    ) : (
      <></>
    );

    return (
      <>
        {nextBtn}
        {lastPersonBtn}
      </>
    );
  } else {
    return (
      <Pressable onPress={() => setStarted(true)} style={styles.btn}>
        <Text style={styles.buttonText}>Начать</Text>
      </Pressable>
    );
  }
};

const App = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [shadowNames, setShadowNames] = useState(names);
  const [lastPerson, setLastPerson] = useState(null);

  useEffect(() => {
    if (!shadowNames.length) {
      setNames([]);
    }
  }, [shadowNames]);
  useEffect(() => {
    if (names.length) {
      setShadowNames(names);
    } else {
      setStarted(false);
    }
  }, [names]);
  useEffect(() => {
    if (started) {
      setLastPerson(null);
    }
  }, [started]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const renderItem = ({item}) => <Text style={styles.listItem}>{item}</Text>;
  const randomPerson = () => {
    const index = getRandomInt(shadowNames.length);
    let popName = shadowNames[index];
    setShadowNames(shadowNames.filter(item => item !== popName));
    setLastPerson(popName);
  };

  return (
    <View style={{display: 'flex', height: '100%', position: 'relative'}}>
      <CModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        {lastPerson}
      </CModal>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Secret Santa</Text>
        </View>

        <View style={styles.mainView}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Введите имя"
            placeholderTextColor="black"
          />
          <Pressable
            style={[styles.btn, started ? {backgroundColor: 'gray'} : {}]}
            disabled={started}
            onPress={() => {
              if (!name.length) {
                return;
              }
              setNames([...names, name]);
              setName('');
            }}>
            <Text style={styles.buttonText}>Добавить</Text>
          </Pressable>
          <Pressable
            style={{...styles.btn, backgroundColor: '#0367B3'}}
            onPress={() => {
              setNames([]);
              setStarted(false);
            }}>
            <Text style={styles.buttonText}>Очистить список</Text>
          </Pressable>
          <View style={styles.namesList}>
            <Text style={styles.listTitle}>Список участников:</Text>
            <FlatList
              style={styles.listTitle}
              data={names}
              renderItem={renderItem}
            />
          </View>
          <ButtonBlock
            getNext={randomPerson}
            setModalVisible={setModalVisible}
            started={started}
            shadowNames={shadowNames}
            lastPerson={lastPerson}
            setStarted={names.length ? setStarted : () => {}}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    display: 'flex',
  },
  input: {
    marginTop: 12,
    paddingHorizontal: 24,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    color: 'black',
    minWidth: '60%',
    textAlign: 'center',
  },
  header: {
    height: '10%',
    display: 'flex',
    backgroundColor: 'red',
    minHeight: '6%',
    maxHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    padding: 30,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 30,
    color: 'white',
  },
  btn: {
    marginTop: 12,
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'rgba(199, 43, 98, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  listTitle: {
    color: 'black',
    fontSize: 20,
    height: 'auto',
  },
  listItem: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  namesList: {
    marginTop: 20,
    maxHeight: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default App;
