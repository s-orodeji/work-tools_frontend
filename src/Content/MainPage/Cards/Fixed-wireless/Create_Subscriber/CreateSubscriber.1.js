import React, {useState} from 'react';
import './CreateSubscriber.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button, FormGroup, FormControl, FormLabel, Row, Col } from "react-bootstrap";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/HashLoader";

function MyVerticallyCenteredModal(props) {

  const override = css`
  position:fixed;
  margin-left:12%;
}
`;
  return (
      <Modal show={true}
        backdrop={false}
        centered
        className='my-modal'
      >
          <Modal.Header>
            <RingLoader
              css={override}
              size={120}
              color={"#3678D7"}
              loading={true}
            />
          </Modal.Header>
        </Modal>         
  );
}

const CreateSubscriber = (props) => {
    const {auth_token} =props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalShow, setModalShow] = React.useState(false);
    const [subscriberName, setsubscriberName] = useState("");
    const [vlanID, setvlanID] = useState("");
    const [pop, setpop] = useState("");
    const [lanSubnetAddress, setlanSubnetAddress] = useState("");
    const [wanIpAddress, setwanIpAddress] = useState("");
    const [wanSubnetAddress, setwanSubnetAddress] = useState("");
    const [wanGatewayAddress, setwanGatewayAddress] = useState("");
    const [hasLoaded, sethasLoaded] = useState("");
    const [apiResponse, setapiResponse] = useState("")

    function validateForm() {
        return subscriberName.length > 0 && pop.length > 0;
      }

    async function apiRequest(){
       axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios({
            method: 'POST',
            url:'http://192.168.6.253:32598/sophosaas/createsubscriber',
            data:{
                "name": subscriberName,
                "lanIP": pop,
                "lanSubnet": lanSubnetAddress,
                "wanIP": wanIpAddress,
                "wanSubnet": wanSubnetAddress,
                "wanGateway": wanGatewayAddress,
                "vlan_ID": vlanID
            },
            headers:{
              'Authorization': 'Bearer '+ auth_token
            }
        }) .then(function(response){
                setapiResponse(response.data['message']);
                sethasLoaded('loaded');
                handleShow();
        }) .catch(err=>{
                sethasLoaded('loadingError');
                handleShow();
        })
    }

    function handleSubmit(event) {
      sethasLoaded("loading");
      apiRequest();
      event.preventDefault();
    }

    return (
        <div className='contentpage'>
          {
            hasLoaded === 'loading' ?
            <div>
          <MyVerticallyCenteredModal
            show={true}
          />
          </div>
          : hasLoaded === 'loaded' ?
          <div>
            <Modal show={show} className='otherModal' onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>{apiResponse}</Modal.Body>
          </Modal>
          </div>
          : hasLoaded === 'loadingError' ?
          <div>
            <form onSubmit={handleSubmit}>
              <p className="f3 fw6 ph0 mh0 pt4">Create Subscriber</p>
                <FormGroup controlId="subscriberName">
                  <FormLabel>Subscriber Name</FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={subscriberName}
                    onChange={e => setsubscriberName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="vlanID">
                  <FormLabel>VLAN ID</FormLabel>
                  <FormControl
                    value={vlanID}
                    onChange={e => setvlanID(e.target.value)}
                    type="number"
                  />
                </FormGroup>
                <FormGroup controlId="exampleForm.ControlSelect1">
                  <FormLabel>Example select</FormLabel>
                  <FormControl as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="lanSubnetAddress">
                  <FormLabel>LAN Subnet Address</FormLabel>
                  <FormControl
                    value={lanSubnetAddress}
                    onChange={e => setlanSubnetAddress(e.target.value)}
                    type="text"
                  />
                </FormGroup>
                <FormGroup controlId="wanIpAddress">
                  <FormLabel>WAN IP Address</FormLabel>
                  <FormControl
                    value={wanIpAddress}
                    onChange={e => setwanIpAddress(e.target.value)}
                    type="text"
                  />
                </FormGroup>
                <FormGroup controlId="wanSubnetAddress">
                  <FormLabel>WAN Subnet Address</FormLabel>
                  <FormControl
                    value={wanSubnetAddress}
                    onChange={e => setwanSubnetAddress(e.target.value)}
                    type="text"
                  />
                </FormGroup>
                <FormGroup controlId="wanGatewayAddress">
                  <FormLabel>WAN Gateway Address</FormLabel>
                  <FormControl
                    value={wanGatewayAddress}
                    onChange={e => setwanGatewayAddress(e.target.value)}
                    type="text"
                  />
                </FormGroup>
                <Button block disabled={!validateForm()} type="submit">
                  Create Subscriber
                </Button>
           </form>
            <Modal show={show} className='otherModal' onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Failed</Modal.Title>
              </Modal.Header>
              <Modal.Body>Subscriber creation error. Please check your input and try again</Modal.Body>
          </Modal>
          </div>
          :<form onSubmit={handleSubmit}>
              <p className="f3 fw6 ph0 mh0 pt4">Create Subscriber</p>
                <FormGroup controlId="subscriberName">
                  <FormLabel>Subscriber Name</FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={subscriberName}
                    onChange={e => setsubscriberName(e.target.value)}
                  />
                </FormGroup>
                <Row>
                    <Col>
                    <FormGroup controlId="vlanID">
                    <FormLabel>VLAN ID</FormLabel>
                    <FormControl
                      value={vlanID}
                      onChange={e => setvlanID(e.target.value)}
                      type="number"
                    />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup controlId="pop">
                      <FormLabel>POP</FormLabel>
                      <FormControl as="select"  value={pop}
                        onChange={e => setpop(e.target.value)}
                        >
                        <option>VI POP</option>
                        <option>LEKKI POP</option>
                        <option>IKOTA POP</option>
                        <option>TANGO POP</option>
                        <option>CRESTVIEW POP</option>
                        <option>NETCOM POP</option>
                        <option>CBN POP</option>
                        <option>ABUJA POP</option>
                        <option>PORT-HARCOURT POP</option>
                        <option>KANO POP</option>
                        <option>CBN POP</option>
                        <option>NETCOM POP</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                    <Col>
                    <FormGroup controlId="vlanID">
                    <FormLabel>VLAN ID</FormLabel>
                    <FormControl
                      value={vlanID}
                      onChange={e => setvlanID(e.target.value)}
                      type="number"
                    />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup controlId="pop">
                      <FormLabel>POP</FormLabel>
                      <FormControl as="select"  value={pop}
                        onChange={e => setpop(e.target.value)}
                        >
                        <option>VI POP</option>
                        <option>LEKKI POP</option>
                        <option>IKOTA POP</option>
                        <option>TANGO POP</option>
                        <option>CRESTVIEW POP</option>
                        <option>NETCOM POP</option>
                        <option>CBN POP</option>
                        <option>ABUJA POP</option>
                        <option>PORT-HARCOURT POP</option>
                        <option>KANO POP</option>
                        <option>CBN POP</option>
                        <option>NETCOM POP</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup controlId="lanSubnetAddress">
                  <FormLabel>LAN Subnet Address</FormLabel>
                  <FormControl
                    value={lanSubnetAddress}
                    onChange={e => setlanSubnetAddress(e.target.value)}
                    type="text"
                  />
                </FormGroup>
               
                <Button block disabled={!validateForm()} type="submit">
                  Create Subscriber
                </Button>
           </form>
          }
            
        </div>
    );
};
export default CreateSubscriber;
