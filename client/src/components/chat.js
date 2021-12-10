import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../socket.js';

import { Card, Form, Row, Col } from 'react-bootstrap';


export default function Chat(props) {
    const chatMessages = useSelector(state => state?.messages);
    const loggedInUser = props.user_id;
    const textareaRef = useRef();
    const chatContainerRef = useRef();
    console.log(chatMessages);

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    });

    const keyCheck = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            socket.emit('newChatMessage', e.target.value);
            textareaRef.current.value = '';
        }
    };

    return (
        <div>
            <Row>
                <Col md={8}>
                    <div className="chat-container" ref={chatContainerRef}>
                        {chatMessages && chatMessages.slice(0).reverse().map(msg => (


                            <div className="container__message" key={msg.message_id}>
                                <div className={"message__body " + (msg.userid == loggedInUser ? "right" : '')} >
                                    <img className={"profilepic-nav " + (msg.userid == loggedInUser ? "right" : '')} src={msg.img_url} />
                                    <p className="message__text" >
                                        {msg.message}
                                    </p>
                                </div>
                                <div className={"message__meta " + (msg.userid == loggedInUser ? "right" : '')}>
                                    <span className="darkgray"> {msg.first} {msg.last} </span>
                                    <span> {msg.created_at}</span>
                                </div>



                            </div>
                        ))}
                    </div>
                </Col>
                <Col md={4}>
                    <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control ref={textareaRef} as="textarea" rows={5} cols={33} onKeyDown={keyCheck} className="input-container" placeholder="Enter your chat message here" />
                    </Form.Group>
                </Col>

            </Row>



        </div>
    );
}
