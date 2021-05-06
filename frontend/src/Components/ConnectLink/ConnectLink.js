import React, { Component } from 'react';
import './ConnectLink.css';

class ConnectLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,
      widgetOpen: false,
    };
    this.handleWidget = this.handleWidget.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.widget = null;
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://js.fintoc.com/v1/';
    script.async = true;
    script.onload = () => this.handleWidget();

    document.body.appendChild(script);
  }

  handleSuccess(params) {
    // console.log('Success', params);
    this.props.setLinkId(params.id);
  }

  // eslint-disable-next-line class-methods-use-this
  handleExit() {
    // console.log('Exit', this.state);
  }

  handleWidget() {
    const params = {
      publicKey: 'pk_test_rnoxbcS4fR845yZBLZpbVjezT9TxvagQ',
      holderType: 'individual', // business or individual
      product: 'movements', // movements or suscription
      webhookUrl: 'https://687f5e5b6dd9.ngrok.io/api/link_token',
      // webhookUrl: 'https://webhook.site/53e760a6-877b-4736-b738-ce6de1af77b3',
      onSuccess: this.handleSuccess,
      onExit: this.handleExit,
    };
    // console.log(params);
    this.widget = window.Fintoc.create(params);
    this.widget.open();
  }

  render() {
    return (
      <h1 className='ConnectLink'>
        Conectar Link {this.state.scriptLoaded}
      </h1>
    );
  }
}

export default ConnectLink;
