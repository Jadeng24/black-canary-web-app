import React, { Component } from 'react';
import io from 'socket.io-client';
import TweenMax from 'gsap';
import $ from 'jquery';
// const socket = io('http://localhost:3069');

// import blackCanaryLogo from './../../images/canaryLogoWithoutWords.svg';


export default class Level1 extends Component {
  constructor() {
      super();

      this.state = {
        title: '',
        message: '',
        recipients: [],
        timeActive: 0,
        timeOptions: [
          {
            time: 1,
            timeMS: 3600000
          },
          {
            time: 2,
            timeMS: (2 * 3600000)
          },
          {
            time: 3,
            timeMS: (3 * 3600000)
          },
          {
            time: 5,
            timeMS: (5 * 3600000)
          },
          {
            time: 10,
            timeMS: (10 * 3600000)
          },
          {
            time: 18,
            timeMS: (18 * 3600000)
          },
          {
            time: 24,
            timeMS: (24 * 3600000)
          }
        ],
        contacts: [
          {
            firstName: 'Janise',
            lastName: 'Suski',
            username: 'janises',
            userID: 1,
            socketID: '98734jbfhljabh38y7r8734oybfjsdhbfwp495bfuijfsgnk547',
            email: 'janises@janises.janises'
          },
          {
            firstName: 'Andi',
            lastName: 'Platter',
            username: 'meatGap',
            userID: 2,
            socketID: '98asjdfhauiwefnkjfgskrguroybfjsdhbf8734y534hgsdf63g263',
            email: 'andi@meat.gap'
          },
          {
            firstName: 'Abby',
            lastName: 'Thelin',
            username: 'noBats',
            userID: 3,
            socketID: '732h5bd672bdhu5489dhj834hf743ihfbfjsdhbfwp495bfuijfsgnk547',
            email: 'abby@noBats.tuna'
          },
          {
            firstName: 'Marissa',
            lastName: 'Fishbeck',
            username: 'princessHackamore',
            userID: 3,
            socketID: '732asdkjfhauiwefhakjsdfalkslkasjdfiaowehfdhbfwp495bfuijfsgnk547',
            email: 'tapth@saltha.gathpacho'
          },
          {
            firstName: 'Alan',
            lastName: 'Miller',
            username: 'alien',
            userID: 4,
            socketID: '732h98234f59e7634asdghf2946msndfblrehfsdhbfwp495bfuijfsgnk547',
            email: 'alan@theystillthinkimhuman.mothership'
          },
          {
            firstName: 'Mom',
            lastName: '',
            username: 'knk',
            userID: 35,
            socketID: '732kasjdhf74qbafjlhskf7q98234hfkjdff743ihfbfjsdhbfwp495bfuijfsgnk547',
            email: 'mom@mom.mom'
          },
          {
            firstName: 'Jake',
            lastName: 'Keator',
            username: 'jakeSnake',
            userID: 44,
            socketID: '7akjsdafhlao723hflakhf34fbajshfs3784kufhibfblrehfsdhbfwp495bfuijfsgnk547',
            email: 'brother@brother.brother'
          },
          {
            firstName: 'Andrew',
            lastName: 'Skywalker',
            username: 'darthEquitus',
            userID: 49,
            socketID: '7akj69afhlaskdjhflaiuwehfa93783784kufhibwi34y89iljbdf8wp495bfuijfsgnk547',
            email: 'boyfriend@boyfriend.boyfriend'
          },
          {
            groupName: 'Family',
            groupID: '1',
            groupMembers: [
              {
                firstName: 'Mom',
                lastName: '',
                username: 'knk',
                userID: 35,
                socketID: '732kasjdhf74qbafjlhskf7q98234hfkjdff743ihfbfjsdhbfwp495bfuijfsgnk547',
                email: 'mom@mom.mom'
              },
              {
                firstName: 'Jake',
                lastName: 'Keator',
                username: 'jakeSnake',
                userID: 44,
                socketID: '7akjsdafhlao723hflakhf34fbajshfs3784kufhibfblrehfsdhbfwp495bfuijfsgnk547',
                email: 'brother@brother.brother'
              },
            ]
          },
          {
            groupName: 'Emergency Contacts',
            groupID: '2',
            groupMembers: [
              {
                firstName: 'Mom',
                lastName: '',
                username: 'knk',
                userID: 35,
                socketID: '732kasjdhf74qbafjlhskf7q98234hfkjdff743ihfbfjsdhbfwp495bfuijfsgnk547',
                email: 'mom@mom.mom'
              },
              {
                firstName: 'Jake',
                lastName: 'Keator',
                username: 'jakeSnake',
                userID: 44,
                socketID: '7akjsdafhlao723hflakhf34fbajshfs3784kufhibfblrehfsdhbfwp495bfuijfsgnk547',
                email: 'brother@brother.brother'
              },
              {
                firstName: 'Andrew',
                lastName: 'Skywalker',
                username: 'darthEquitus',
                userID: 49,
                socketID: '7akj69afhlaskdjhflaiuwehfa93783784kufhibwi34y89iljbdf8wp495bfuijfsgnk547',
                email: 'boyfriend@boyfriend.boyfriend'
              },
            ]
          },
        ]
      }
  }

  componentDidMount(){
    console.log(this.props.match.params);
    let x = this.props.match.params.id.split("_").join(" ").toUpperCase()
    this.setState({
      title: x
    })
  }

  setCustomTitle(event){
    event.preventDefault()
    this.setState({
      title: event.target.value
    })
    console.log(this.state.title);
  }

  toggleRecipient(event, userObj) {
    let index = -1;
    for (let i = 0; i < this.state.recipients.length; i++){
      if(userObj.hasOwnProperty('groupName')) {
        if (this.state.recipients[i].groupName === userObj.groupName) {
          index = i;
        }
      } else {
        if (this.state.recipients[i].username === userObj.username) {
           index = i;
        }
      }
    }

    let r = this.state.recipients.slice(0);
    if(index >= 0) {
      //remove from recip and change color back
      TweenMax.to($(`#${userObj.username}`), 0, { backgroundColor: 'rgba(239, 239, 239, 0.3)', color: '#efefef', ease: TweenMax.Power1.easeInOut})
      r.splice(index, 1);
    } else {
      //to recip, change color
      TweenMax.to($(`#${userObj.username}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut})
      r.push(userObj);
    }

    this.setState({
      recipients: r
    })

  }

  chooseTime(val) {
    this.setState({
      timeActive: val
    })
  }

  render() {

    return (
        <div id="Level1">
          <div className="wrapper">
            <header>{
              this.props.match.params.id === "custom" ?
              <input className="customHeaderInput" placeholder="Enter situation" onChange={(e)=> this.setCustomTitle(e)}></input> :
              this.props.match.params.id.split("_").join(" ")}</header>
            <section className="situationContainer">
              <div className="messageWrapper">
                <h3>Message:</h3>
                <textarea maxLength="180"></textarea>
              </div>
              <div className="recipWrapper">
                <h3>To:</h3>
                <div>
                  {
                    this.state.contacts.map(e => {
                      if(e.hasOwnProperty('groupName')){
                        return <button key={e.groupName} id={e.groupName} onClick={event => this.toggleRecipient(event, e)} >{e.groupName}</button>
                      } else {
                        return <button key={e.username} id={e.username} onClick={event => this.toggleRecipient(event, e)} >{`${e.firstName} ${e.lastName}`}</button>
                      }
                    })
                  }
                </div>
              </div>
              <div className="timeWrapper">
                <h3>Time Active:</h3>
                <select value={this.state.timeActive} onChange={e => this.chooseTime(e.target.value)}>
                  {this.state.timeOptions.map(e => {
                    return <option key={e.time} value={e.timeMS}>{`${e.time} hours`}</option>
                  })}
                </select>
              </div>
              <div className="buttnWrapper">
                <button>SEND</button>
              </div>
            </section>
          </div>
        </div>
    );
  }
}
