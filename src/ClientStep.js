import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function ClientStep(props) {

    const {clientInfo, setClientInfo} = props;

    return (
        <div>
            <form className={'client-step-container'}>
                <h3 className={'client-heading'}>
                    Fill your information below:
                </h3>
                <div className={'client-info-container'}>
                    <div className={'client-left-info'}>
                        <Tooltip title={!clientInfo.fullName.isValid ? 'Name should be longer then 1 symbol' : ''}>
                            <TextField
                                error={!clientInfo.fullName.isValid}
                                required
                                label='Full name'
                                value={clientInfo.fullName.value}
                                className={'client-input'}
                                onChange={(e) => {
                                    setClientInfo('fullName', e.target.value)
                                }}
                            />
                        </Tooltip>
                        <Tooltip title={!clientInfo.idNumber.isValid ? 'Make sure your id number is correct' : ''}>
                            <TextField
                                error={!clientInfo.idNumber.isValid}
                                required
                                label={'Id number'}
                                value={clientInfo.idNumber.value}
                                className={'client-input'}
                                onChange={(e) => {
                                    setClientInfo('idNumber', e.target.value)
                                }}
                            />
                        </Tooltip>
                        <Tooltip title={!clientInfo.age.isValid ? 'You should be older than 17 years old' : ''}>
                            <TextField
                                error={!clientInfo.age.isValid}
                                required
                                label="Age"
                                type="number"
                                value={clientInfo.age.value}
                                onChange={(e) => {
                                    setClientInfo('age', e.target.value)
                                }}
                                className={'client-input'}
                            />
                        </Tooltip>

                    </div>
                    <div className={'client-right-info'}>
                        <TextField
                            label="Comment"
                            value={clientInfo.comment.value}
                            onChange={(e) => {
                                setClientInfo('comment', e.target.value)
                            }}
                            className={'client-input'}
                            multiline
                            rowsMax={4}
                        />
                        <Select
                            label="Target area"
                            value={clientInfo.targetArea.value}
                            onChange={(e) => {
                                setClientInfo('targetArea', e.target.value)
                            }}
                            className={'client-input'}
                        >
                            <MenuItem value={'Georgia'}>Georgia</MenuItem>
                            <MenuItem value={'USA'}>USA</MenuItem>
                            <MenuItem value={'Germany'}>Germany</MenuItem>
                        </Select>
                        <FormControlLabel
                            labelPlacement={'start'}
                            className={'client-input'}
                            control={
                                <Checkbox
                                    checked={clientInfo.subscribed.value}
                                    color="primary"
                                    onChange={(e) => {
                                        setClientInfo('subscribed', e.target.checked)
                                    }}
                                />
                            }
                            label={'subscribe'}
                        />

                    </div>

                </div>
            </form>

        </div>
    );
}