const { NamiAPI } = require('../models/NamiApiModels')
const { SenderApi } = require('../models/NamiSenderModels')


exports.ConnectNami = async (req, res) => {

}

exports.SaveNami = async (req, res) => {
    const { network, address, address_hex, utxos, utxos_hex, reward_address, reward_address_hex, assets, } = req.body

    const ExistData = await NamiAPI.findOne({ address: address })
    if (!ExistData) {

        let CreateNewNami = new NamiAPI({
            network,
            address,
            address_hex,
            utxos,
            utxos_hex,
            reward_address,
            reward_address_hex,
            assets
        })
        const Created = await CreateNewNami.save()
        if (Created) {

            res.status(200).json(Created)
        } else {
            res.status(400).send({ message: Created })
        }
    } else {
        res.status(201).send({ message: 'Nami Already Connected !' })
    }
}

exports.SaveCost = async (req, res) => {
    const {
        address,
        price,
        password
    } = req.body
    const AddSender = new SenderApi({
        address,
        price,
        password
    })

    await AddSender.save()
        .then(data => {
            res.status(200).send({ message: 'Data Success Added' })
        }).catch(err => {
            res.status(400).send({ message: 'Error' })
        })
}


exports.GetNami = async (req, res) => {
    await SenderApi.find({})
        .sort({ updated_at: 'desc' })
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(404).send({ message: 'Data Tidak Di temukan' })
        })
}

exports.RemoveAllSend = async (req, res) => {
    await SenderApi.remove({})
        .then(data => {
            res.status(200).send({ message: `Done` })
        }).catch(err => {
            res.status(404).send({ message: 'Data Kosong' })
        })
}