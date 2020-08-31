import React, {useState} from 'react';
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import adAction from "./redux/actions/adAction";
import {v4 as uuidv4} from 'uuid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ClientStep from './ClientStep';
import BannerStep from './BannerStep';

function getSteps() {
    return ['Client info', 'Upload ads'];
}

function getStepContent(activeStep, clientInfo, setClientInfo) {
    switch (activeStep) {
        case 0:
            return <ClientStep clientInfo={clientInfo} setClientInfo={setClientInfo}/>;
        case 1:
            return <BannerStep/>;
        default:
            return 'Unknown step';
    }
}

function App() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const [clientInfo, setClientInfo] = useState({
        fullName: {value: '', isValid: true},
        idNumber: {value: '', isValid: true},
        age: {value: '', isValid: true},
        targetArea: {value: 'Georgia'},
        subscribed: {value: false},
        comment: {value: '', isValid: true},
    });

    const ads = useSelector(state => state.ads);

    const validators = {
        fullName: (value) => {
            return /^[a-zA-Z]{2}[a-zA-Z ]*$/.test(value);
        },
        idNumber: (value) => {
            return /^\d{11}$/.test(value);
        },
        age: (value) => {
            return value >= 18;
        }
    };

    let isValidAllClientFields = true;

    for (const key in clientInfo) {
        let value = clientInfo[key].value;

        if (validators[key]) {
            if (!validators[key](value)) {
                isValidAllClientFields = false;
                break;
            }
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="App">
            <Stepper activeStep={activeStep}>
                {
                    steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })
                }
            </Stepper>
            <div>
                {
                    activeStep === steps.length ? (
                        <div style={{
                            textAlign: 'center',
                            marginTop: '7vh'
                        }}>
                            <Typography> All steps completed! </Typography>
                        </div>
                    ) : (
                        <div>
                            <div
                                className={'steps-info-container'}> {
                                getStepContent(activeStep, clientInfo, (fieldName, value) => {
                                    setClientInfo({
                                        ...clientInfo,
                                        [fieldName]: {
                                            value: value,
                                            isValid: validators[fieldName] ? validators[fieldName](value) : undefined
                                        }
                                    });
                                })} </div>
                            <div className={'stepper-buttons-container'}>
                                <Button disabled={activeStep === 0} onClick={handleBack}>
                                    Back
                                </Button>
                                <Button
                                    disabled={!isValidAllClientFields}
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
