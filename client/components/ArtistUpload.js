import React, { Component } from "react";
import web3 from "../../src/web3";
import ipfs from "../../src/ipfs";
import storehash from "../../src/storehash";
// import { Button } from "reactstrap";
import axios from "axios";
<<<<<<< HEAD
import TextField from '@material-ui/core/TextField';
=======
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'

const buttonStyle = {
  background: '#C4F0C5',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};
>>>>>>> 0575f417c130b00680118d8e077f78547a4cb715

class ArtistUpload extends Component {
  constructor() {
    super();
    this.state = {
      songTitle: "",
      genre: "",
      imageUrl: 'https://www.shazam.com/resources/6a70bd6acae5578760b35e54e0d1e943d7579ae7/nocoverart.jpg',
      ipfsHash: null,
      buffer: "",
      ethAddress: "",
      transactionHash: "",
      txReceipt: "",
      songName: "",
      genre: ""
    };
    this.captureFile = this.captureFile.bind(this);
    this.captureArtwork = this.captureArtwork.bind(this);
    this.convertToBuffer = this.convertToBuffer.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //Take file input from user
  captureFile(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('FILES ARE: ', event.target.files)
    const file = event.target.files[0];
    console.log('FILE IS: ', file)
    let reader = new window.FileReader();
    console.log('READER IS: ', reader)
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }
  async captureArtwork(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('FILES ARE: ', event.target.files)
    const file = event.target.files[0];
    console.log('FILE IS: ', file)
    await this.setState({imageUrl: URL.createObjectURL(file)})
    console.log('STATE', this.state.imageUrl)
    let reader = new window.FileReader();
    console.log('READER IS: ', reader)
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }
  //Convert the file to buffer to store on IPFS
  async convertToBuffer(reader) {
    const buffer = await Buffer.from(reader.result);
    this.setState({ buffer });
  }
  async onClick() {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });
      await web3.eth.getTransactionReceipt(
        this.state.transactionHash,
        (err, txReceipt) => {
          // console.log(err, txReceipt);
          this.setState({ txReceipt });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

<<<<<<< HEAD
  async handleChange(event) {
    event.preventDefault();
    await this.setState({
      [event.target.name]: event.target.value,
    });
=======
  async onChange (event) {
    event.preventDefault()
    await this.setState({
      [event.target.name]: event.target.value
    })
>>>>>>> 0575f417c130b00680118d8e077f78547a4cb715
  }

  async onSubmit(event) {
    // storehash.options.address =
    //   "0x059105c50081b77e31a1c19e1223365698e2cb915ec2f35992388600b8d609fe";
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });
    // eslint-disable-next-line handle-callback-err
    await ipfs.add(this.state.buffer, async (err, ipfsHash) => {
      // console.log(err, ipfsHash);
      this.setState({ ipfsHash: ipfsHash[0].hash });
      storehash.methods.setHash(this.state.ipfsHash).send(
        {
          from: accounts[0]
        },
        (error, transactionHash) => {
          // console.log(transactionHash);
          this.setState({ transactionHash });
        }
      );
      const song = {ipfsHash, title: this.state.songName, genre: this.state.genre}
      await axios.post(`/api/songs`, song);
    });
  }
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <div>
          <div id="formbox">
            <div>
            <h2>Upload your audio here:</h2>
            <div>
            <form onSubmit={this.onSubmit}>
              <TextField
                required
                type="text"
                name="songTitle"
                id="standard-name"
                label="Song Title"
                margin="normal"
                onChange={this.handleChange}
              />
              <br/>
              <TextField
                required
                type="text"
                name="genre"
                id="standard-name"
                label="Genre"
                margin="normal"
                onChange={this.handleChange}
              />
              <br/>
              <input type="file" onChange={this.captureFile} />
              <Button bsstyle="primary" type="submit">
                Send it
              </Button>
            </form>
            </div>
            </div>
            <div>
              <p>Cover Art Preview</p>
              <img src={this.state.imageUrl} />
=======
        <div id="artistform">
          <div id="formbox">
            <div id="formupload">
              <div>
              <h2>Upload your songs here:</h2>
              <div>
              <form onSubmit={this.onSubmit}>
                <TextField
                  required
                  type="text"
                  name="songTitle"
                  id="standard-name"
                  label="Song Title"
                  margin="normal"
                  onChange={this.onChange}
                />
                <br/>
                <TextField
                  required
                  type="text"
                  name="genre"
                  id="standard-name"
                  label="Genre"
                  margin="normal"
                  onChange={this.onChange}
                />
                <br/>
                <div>
                <input
                  id='uploadSong'
                  type="file"
                  accept='audio/*'
                  style={{display: 'none'}}
                  onChange={this.captureFile}
                />
                <label htmlFor='uploadSong'>
                  <Button style={buttonStyle} component='span'>Upload Song</Button>
                </label>
                <br/>
                <input
                  id='uploadAlbumArtwork'
                  type="file"
                  accept='image/*'
                  style={{display: 'none'}}
                  onChange={this.captureArtwork}
                />
                <label htmlFor='uploadAlbumArtwork'>
                  <Button style={buttonStyle} component='span'>Upload Album Artwork</Button>
                </label>

                </div>
                <Button style={buttonStyle} type="submit">
                  Send it
                </Button>
              </form>
              </div>
              </div>
            </div>
            <div id="formcoverart">
              <p>Cover Art Preview</p>
              <img id="cover-art" src={this.state.imageUrl} />
>>>>>>> 0575f417c130b00680118d8e077f78547a4cb715
            </div>
          </div>
          <hr />
          <Button style={buttonStyle} onClick={this.onClick}> Get Transaction Receipt </Button>
          <hr />
          <table bordered="true" responsive="true">
            <thead>
              <tr>
                <th>Your Upload Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Song Upload Hash:</td>
                <td>{this.state.ipfsHash}</td>
              </tr>
              <tr>
                <td>Contract Address:</td>
                <td>{this.state.ethAddress}</td>
              </tr>
              <tr>
                <td>Transaction:</td>
                <td>{this.state.transactionHash}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ArtistUpload;
