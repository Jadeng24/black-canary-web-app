import React, { Component } from 'react';
import io from 'socket.io-client';
// const socket = io('http://localhost:3069');
// import blackCanaryLogo from './../../images/canaryLogoWithoutWords.svg';


export default class Level2 extends Component {
  constructor() {
      super();

      this.state = {
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

  }


  render() {

    return (
        <div>
          <header>{/*this.props.params.situation*/'Level 1'}</header>
          <section className="situtationContainer">
            <div>
              <h3>Message:</h3>
              <textarea></textarea>
            </div>
            <div>
              <h3>Time Active:</h3>
              <select>
              {/*Time options map*/}
              </select>
            </div>
            <div>
              <button>SEND</button>
            </div>
          </section>
        </div>
    );
  }
}
