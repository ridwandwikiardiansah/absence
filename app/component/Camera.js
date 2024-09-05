import React, {Component} from 'react';
import {StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Entypo'; 

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: 'back',
      mirror: false
    };
    // this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.switchCamera = this.switchCamera.bind(this)
  }

  takePicture = async function () {
    const {navigation} = this.props;
    const options = {
      quality: 1, 
      base64: true,
      orientation: 'portrait',
      width: 500,
    };
    const datas = await this.camera.takePictureAsync(options);
    navigation.navigate(`Form`, {photo: datas})
  };

  switchCamera(){
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        mirror: true
      });
    } else {
      this.setState({
        cameraType: 'back',
        mirror: false
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.container}
          ref={(ref) => {
            this.camera = ref;
          }}
          type={this.state.cameraType} 
          mirrorImage={this.state.mirrorMode}
          onBarCodeRead={this.onBarCodeRead}
        />
         <View style={styles.buttonCapture}>
            <TouchableOpacity>
              <Icon name="camera" size={40} onPress={this.takePicture}/>
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', right: 20,top: '50%'}}>
            <Icon name='cycle' size={25} onPress={this.switchCamera} />
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCapture: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});


export default Camera