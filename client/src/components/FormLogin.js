import React from 'react';
import { Button,Form} from 'react-bootstrap';
import Proptypes from 'prop-types';


const FormLogin = props => {
    const { userId, handleInput, connectToChatkit } = props;
   
    return (
        <div className="dialog-container">
            <div className="dialog">
                <Form className="form-border" onSubmit={connectToChatkit}>
                <Form.Group >
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        id="username"
                        type="text" 
                        className="username-input"
                        autoFocus
                        name="userId"
                        value={userId}
                        onChange={handleInput}
                        placeholder="Enter your username"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Sign in</Button>
                {/* <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>                      */}

            </Form>
            </div>
        </div>
    
  
    )
    
};

FormLogin.propTypes = {
    userId: Proptypes.string.isRequired,
    handleInput: Proptypes.func.isRequired,
    connectToChatkit: Proptypes.func.isRequired,
  };

export default FormLogin ;