import React from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {browserHistory} from 'react-router';

const SuccessRegistr = () => {
    return (
        <Grid>
            <Row>
                <Col className="success" lg={6} lgOffset={3}>
                    <h3>Succesfull registration</h3>
                    <Button onClick={() => {browserHistory.push('/')}} bsStyle="primary">Back to start page</Button>
                </Col>
            </Row>
        </Grid>
    )
}

module.exports = SuccessRegistr;