import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/image-link-form/imglinkform';
import Rank from './components/rank/rank';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'b95b4293b5044096ba88d1bd4ab865ac'
 });

const particlesOptions = {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800
        }
        }
        }
      }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log('click'); 
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input).then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }


  render() {
    return (
      <div className="App">
        <Particles className="particles" 
              params={particlesOptions}
             />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>        
        <FaceRecognition imageUrl={this.state.imageUrl}  />
      </div>
    );
  }
}

export default App;
