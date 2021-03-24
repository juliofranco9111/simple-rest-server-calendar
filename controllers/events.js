const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');


    res.json({
        ok: true,
        events
    })
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);
    event.user = req.uid;

    try {

        const eventDB = await event.save();

        res.json({
            ok: true,
            event: eventDB

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;


    try {

        const eventDB = await Event.findById(eventId);

        if (!eventDB) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no ha sido encontrado'
            });
        };

        if (eventDB.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
            useFindAndModify: false
        })

        res.json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid
    
    try {
        const eventDB = await Event.findById(eventId);

        if (!eventDB) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no ha sido encontrado'
            });
        };
    
        if (eventDB.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }
        
        await Event.findByIdAndDelete(eventDB.id);

        res.json({
            ok: true,
            msg: 'Evento eliminado satisfactoriamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
