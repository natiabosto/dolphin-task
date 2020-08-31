import adAction from "./redux/actions/adAction";
import {v4 as uuidv4} from 'uuid';
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import EditRounded from '@material-ui/icons/EditRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import {Unstable_TrapFocus} from '@material-ui/core'

export default function BannerStep(props) {
    const ads = useSelector(state => state.ads);
    const dispatch = useDispatch();

    // const [ad, setAd] = useState({name: '', image: ''});
    // const [editedAd, setEditedAd] = useState({name: '', image: '',});

    const [newName, setNewName] = useState({
        value: '',
        isValid: true
    });
    const [name, setName] = useState({
        value: '',
        isValid: true
    });
    const [newAmount, setNewAmount] = useState({
        value: '',
        isValid: true
    });
    const [amount, setAmount] = useState({
        value: '',
        isValid: true
    });

    const [modalOpen, setModalOpen] = React.useState(null);

    const validators = {
        name: (value) => {
            return /^[a-zA-Z]{2}[a-zA-Z]*$/.test(value);
        },
        amount: (value) => {
            return value >= 100;
        },
        newName: (value) => {
            return /^[a-zA-Z]{2}[a-zA-Z]*$/.test(value);
        },
        newAmount: (value) => {
            return value >= 100;
        }
    };

    let isValidAllNewAdFields = true;

    if (!validators.newName(newName.value)) isValidAllNewAdFields = false;
    if (!validators.newAmount(newAmount.value)) isValidAllNewAdFields = false;

    let isValidAllEditFields = true;

    if (!validators.name(name.value)) isValidAllEditFields = false;
    if (!validators.amount(amount.value)) isValidAllEditFields = false;

    return (
        <div>
            <div className={'add-banner-container'}>
                <form className={'banner-step-container'}>
                    <label className={'new-banner-heading'}>
                        Add advertisement:
                    </label>
                    <Tooltip
                        title={!newName.isValid ? 'Name should be longer then 1 symbol and should contain only letters' : ''}>
                        <TextField
                            error={!newName.isValid}
                            required
                            label='Advertisement name'
                            value={newName.value}
                            className={'banner-input'}
                            onChange={(e) => {
                                setNewName({
                                    ...newName,
                                    value: e.target.value,
                                    isValid: validators.newName(e.target.value)
                                })
                            }}
                        />
                    </Tooltip>
                    <Tooltip title={!newAmount.isValid ? 'Banner amount should not be less than 100' : ''}>
                        <TextField
                            error={!newAmount.isValid}
                            required
                            label="Amount"
                            type="number"
                            value={newAmount.value}
                            onChange={(e) => {
                                setNewAmount({
                                    ...newAmount,
                                    value: e.target.value,
                                    isValid: validators.newAmount(e.target.value)
                                })
                            }}
                            className={'banner-input'}
                        />
                    </Tooltip>
                </form>
                <Button
                    disabled={!isValidAllNewAdFields}
                    onClick={() => {
                        dispatch(adAction.addAd({
                            name: newName.value,
                            amount: newAmount.value
                        }));
                        setNewName({
                            value: '',
                            isValid: true
                        });
                        setNewAmount({
                            value: '',
                            isValid: true
                        });
                    }}
                    variant="contained"
                    color="primary"
                    className={'new-advertisement-button'}>
                    Add advertisement
                </Button>
            </div>
            <div>
                <Grid container spacing={3}>
                    <label className={'banners-list-heading'}>
                        Added advertisements:
                    </label>
                    {
                        ads.length ?
                            ads.map((ad, indexOfAd) => {
                                return (
                                    <Grid item xs={12} key={uuidv4()}>
                                        <Paper className={'grid-banner-container'}>
                                            <div className={'banner-info-container'}>
                                                <div className={'text-container'}>
                                                    <h4>
                                                        Name: {ad.name}
                                                    </h4>
                                                    <label>
                                                        Amount: {ad.amount}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className={'banner-tools-container'}>
                                                <div className={'tools-container'}>
                                                    <EditRounded
                                                        onClick={() => {
                                                            setName({value: ad.name, isValid: true});
                                                            setAmount({value: ad.amount, isValid: true});
                                                            setModalOpen(indexOfAd);
                                                            document.body.style = 'overflow: hidden;';
                                                        }}
                                                        className={'tool-icon'}
                                                    />
                                                    <DeleteRounded
                                                        onClick={() => {
                                                            dispatch(adAction.deleteAd(indexOfAd));
                                                        }}
                                                        className={'tool-icon'}
                                                    />
                                                </div>
                                            </div>
                                        </Paper>
                                    </Grid>

                                )
                            }) :
                            // <div>
                            <label className={'empty-ad-label'}>You have 0 added advertisements</label>
                        // </div>
                    }
                </Grid>
            </div>

            <div style={{display: modalOpen !== null ? 'block' : 'none'}}
                 className={'modal-div'}
            >
                <div className={'modal'}>
                    <form>
                        <label className={'new-banner-heading'}>
                            Edit advertisement:
                        </label>
                        <Tooltip
                            title={!name.isValid ? 'Name should be longer then 1 symbol and should contain only letters' : ''}>
                            <TextField
                                error={!name.isValid}
                                required
                                label='Advertisement name'
                                value={name.value}
                                className={'banner-input'}
                                onChange={(e) => {
                                    let targetValue = e.target.value;
                                    setName({
                                        ...name,
                                        value: targetValue,
                                        isValid: validators.name(targetValue)
                                    })
                                }}
                            />
                        </Tooltip>
                        <Tooltip
                            title={!amount.isValid ? 'Banner amount should not be less than 100' : ''}>
                            <TextField
                                error={!amount.isValid}
                                required
                                label="Amount"
                                type="number"
                                value={amount.value}
                                onChange={(e) => {
                                    let targetValue = e.target.value;
                                    setAmount({
                                        ...amount,
                                        value: targetValue,
                                        isValid: validators.amount(targetValue)
                                    })
                                }}
                                className={'banner-input'}
                            />
                        </Tooltip>
                    </form>
                    <div className={'modal-buttons-container'}>
                        <Button disabled={!isValidAllEditFields}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    ads[modalOpen] = {
                                        name: name.value,
                                        amount: amount.value
                                    };

                                    console.log('bla ', ads)
                                    dispatch(adAction.editAd(ads));

                                    setModalOpen(null);
                                    setName({value: '', isValid: true});
                                    setAmount({value: '', isValid: true});
                                    document.body.style = 'overflow: auto;';
                                }}>
                            Submit
                        </Button>
                        <Button variant="contained" color="primary"
                                onClick={() => {
                                    setModalOpen(null);
                                    setName({value: '', isValid: true});
                                    setAmount({value: '', isValid: true});
                                    document.body.style = 'overflow: auto;';
                                }}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}