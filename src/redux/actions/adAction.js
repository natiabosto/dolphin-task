const addAd = (advertisement) => {
    return {
        type: "ADD_AD",
        payload: advertisement
    }
};

const editAd = (advertisement, adIndex) => {
    console.log('actionshi stringia ki?', advertisement);
    return {
        type: "EDIT_AD",
        payload: advertisement,
        index: adIndex
    }
};

const deleteAd = (adIndex) => {
    return {
        type: "DELETE_AD",
        index: adIndex
    }
};

export default {
    addAd,
    editAd,
    deleteAd
}