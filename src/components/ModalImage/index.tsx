import { AuthContext } from "@/src/contexts/AuthContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext, useState } from "react";
import { Text, View, Modal, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';

interface ImageModalProps {
  visible: boolean;
  onClose: () => void;
  imageType: "avatar" | "banner";
  uri: string | null;
  setUri: (type: string | null) => void;
}

export default function ModalImage({ visible, onClose, imageType, uri, setUri }: ImageModalProps) {
  const {  UpdateAvatarUser, UpdateBannerUser, loadingAuth } = useContext(AuthContext);

  const [type, setType] = useState<string | undefined>('null');
  const [nameImg, setNameImg] = useState<string | null | undefined>(null);


  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setUri(result.assets[0].uri);
      setNameImg(result.assets[0].fileName);
      setType(result.assets[0].mimeType);
    }
  }

  async function EditAvatar() {


    if (!nameImg || !uri) {
      Toast.show({
        type: 'error',
        text1: 'Ops! Imagem invalida ',
        text2: 'Adicione uma imagem valida.'
      })
      return
    }

    await UpdateAvatarUser({
      uri: uri,
      nameImg: nameImg,
      type: type,
    })

    onClose()
    setUri(null)
    return;

  }

  async function EditBanner() {
    if (!nameImg || !uri) {
      Toast.show({
        type: 'error',
        text1: 'Ops! Imagem invalida ',
        text2: 'Adicione uma imagem valida.'
      })
      return
    }

    await UpdateBannerUser({
      uri: uri,
      nameImg: nameImg,
      type: type,
    })

    onClose()
    setUri(null)
    return;
  }

  const imageSource = imageType === "avatar"
    ? require("../../assets/avatar_placeholder.png")
    : require("../../assets/placeholder.jpg")



  if (imageType === "avatar") {

    return (

      <Modal
        visible={visible}
        animationType='fade'
        transparent={true}
      >
        <View className=' flex-1 flex-col items-center justify-center px-2 bg-[rgba(0,0,0,0.5)] '  >
          <TouchableOpacity className='w-full h-[25%]' onPress={onClose} ></TouchableOpacity>
          <View className='w-full h-[50%] bg-slate-100 rounded-xl flex flex-col items-center justify-center ' >
            <TouchableOpacity className='absolute top-4 right-5 flex-row items-center gap-2' onPress={onClose} >
              <AntDesign name="closecircleo" size={24} color="#dc2626" />
            </TouchableOpacity>

            <View className='w-full flex-col items-center ' >
              <TouchableOpacity className='flex-col items-center' onPress={pickImage}>
                {uri === null ?
                  (
                    <Image
                      source={imageSource}
                      className='w-60 h-60 rounded-full border-4 border-slate-100  '
                    />
                  ) : (
                    <Image
                      source={{ uri: uri }}
                      className='w-60 h-60 rounded-full border-4 border-slate-100  '
                    />
                  )
                }

                <View className='w-60 h-60 rounded-full bg-transparent items-center justify-center absolute' >
                  <MaterialIcons name="add-to-photos" size={25} color="black" />
                </View>

              </TouchableOpacity>
            </View>


            <View className='w-full items-center justify-center mt-8 '  >
              <TouchableOpacity className='w-[70%] py-3 bg-blue-900 items-center rounded-xl' onPress={EditAvatar} >

                {loadingAuth ?
                  <ActivityIndicator size={25} color={'#FFF'} />
                  :
                  <Text className='text-slate-100 font-semibold' >Atualizar</Text>
                }

              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity className='w-full h-[25%]' onPress={onClose}  ></TouchableOpacity>
        </View>
      </Modal>
    )
  }

  return (

    <Modal
      visible={visible}
      animationType='fade'
      transparent={true}
    >
      <View className=' flex-1 flex-col items-center justify-center px-2 bg-[rgba(0,0,0,0.5)] '  >
        <TouchableOpacity className='w-full h-[25%]' onPress={() => { }} ></TouchableOpacity>
        <View className='w-full h-[50%] bg-slate-100 rounded-xl flex flex-col items-center justify-center ' >
          <TouchableOpacity className='absolute top-4 right-5 flex-row items-center gap-2' onPress={onClose} >
            <AntDesign name="closecircleo" size={24} color="#dc2626" />
          </TouchableOpacity>

          <View className='w-full flex-col items-center ' >
            <TouchableOpacity className='flex-col items-center' onPress={pickImage}>
              {uri === null ?
                (
                  <Image
                    source={imageSource}
                    className='w-[360px] h-56 rounded-3xl  '
                  />
                ) : (
                  <Image
                    source={{ uri: uri }}
                    className='w-[360px] h-56 rounded-3xl  '
                  />
                )
              }

              <View className='w-[360px] h-56 rounded-3xl bg-transparent items-center justify-center absolute' >
                <MaterialIcons name="add-to-photos" size={25} color="black" />
              </View>
            </TouchableOpacity>
          </View>


          <View className='w-full items-center justify-center mt-8 ' >
            <TouchableOpacity className='w-[70%] py-3 bg-blue-900 items-center rounded-xl' onPress={EditBanner} >

              {loadingAuth ?
                <ActivityIndicator size={25} color={'#FFF'} />
                :
                <Text className='text-slate-100 font-semibold' >Atualizar</Text>
              }

            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity className='w-full h-[25%]' onPress={onClose}  ></TouchableOpacity>
      </View>
    </Modal>

  );
}
